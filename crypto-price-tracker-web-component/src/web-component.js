import { defineCustomElement } from 'vue';
import VueCoinTracker from './components/coin-tracker.ce.vue';

export const CoinTracker = defineCustomElement(VueCoinTracker);

export function register(tagName = 'coin-tracker') {
    customElements.define(tagName, CoinTracker);
}
