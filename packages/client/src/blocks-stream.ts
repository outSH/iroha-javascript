import Emittery from 'emittery'
import Debug from 'debug'
import { VersionedBlockMessage, VersionedBlockSubscriptionRequest, VersionedCommittedBlock } from '@iroha2/data-model'
import { ENDPOINT_BLOCKS_STREAM } from './const'
import { SocketEmitMapBase, setupWebSocket } from './util'
import { IsomorphicWebSocketAdapter } from './web-socket/types'

const debug = Debug('@iroha2/client:blocks-stream')

export interface SetupBlocksStreamParams {
  toriiApiURL: string
  height: bigint
  adapter: IsomorphicWebSocketAdapter
}

export interface BlocksStreamEmitteryMap extends SocketEmitMapBase {
  block: VersionedCommittedBlock
}

export interface SetupBlocksStreamReturn {
  stop: () => Promise<void>
  isClosed: () => boolean
  ee: Emittery<BlocksStreamEmitteryMap>
}

export async function setupBlocksStream(params: SetupBlocksStreamParams): Promise<SetupBlocksStreamReturn> {
  const {
    ee,
    send: sendRaw,
    isClosed,
    close,
    accepted,
  } = setupWebSocket<BlocksStreamEmitteryMap>({
    baseURL: params.toriiApiURL,
    endpoint: ENDPOINT_BLOCKS_STREAM,
    parentDebugger: debug,
    adapter: params.adapter,
  })

  ee.on('open', () => {
    sendRaw(VersionedBlockSubscriptionRequest.toBuffer(VersionedBlockSubscriptionRequest('V1', params.height)))
  })

  ee.on('message', (raw) => {
    const block = VersionedBlockMessage.fromBuffer(raw).enum.content
    ee.emit('block', block)
  })

  await accepted()

  return {
    ee:
      // Emittery typing bug
      ee as unknown as Emittery<BlocksStreamEmitteryMap>,
    stop: close,
    isClosed,
  }
}