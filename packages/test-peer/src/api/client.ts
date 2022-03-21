import type * as lib from '../lib';
import Axios from 'axios';

const axios = Axios.create();

export function setBaseURL(url: string) {
    axios.defaults.baseURL = url;
}

export async function setConfiguration(configs: lib.IrohaConfiguration) {
    await axios.post('/configuration', configs);
}

export async function cleanConfiguration() {
    await axios.delete('/configuration');
}

export async function cleanSideEffects() {
    await axios.delete('/side-effects');
}

export async function startPeer(genesis = true) {
    await axios.post('/peer/start', null, { params: { genesis } });
}

export async function killPeer(cleanSideEffects = false) {
    await axios.post('/peer/kill', null, { params: { clean: cleanSideEffects } });
}