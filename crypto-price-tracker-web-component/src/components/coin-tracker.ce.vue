<script lang="ts" setup>
    import { reactive, ref } from 'vue';

    import CoinCheck from './coin-check.vue';

    const props = defineProps<{
        pair?: string;
        background: string;
    }>();

    const url = 'https://api.coinbase.com/v2/prices';

    const btcPair = 'BTC-USD';
    const ethPair = 'ETH-USD';

    interface moneyFormat {
        formatted: string;
        money: number;
        name: string;
    }

    const btc = reactive({} as moneyFormat);
    const eth = reactive({} as moneyFormat);
    const coinName = reactive({} as moneyFormat);
    const date = ref('');

    async function grabPrices(pair: string): Promise<moneyFormat> {
        const btcInfo = await fetch(`${url}/${pair}/buy`);

        const money = await btcInfo.json();

        return {
            money: parseFloat(money.data.amount),
            formatted: new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'USD'
            }).format(money.data.amount),
            name: pair.split('-')[0]
        };
    }

    async function setValues(): Promise<void> {
        const btcValue = await grabPrices(btcPair);
        const ethValue = await grabPrices(ethPair);

        btc.name = btcValue.name;
        btc.money = btcValue.money;
        btc.formatted = btcValue.formatted;

        eth.name = ethValue.name;
        eth.money = ethValue.money;
        eth.formatted = ethValue.formatted;

        if (props.pair) {
            const pairValue = await grabPrices(props.pair);

            coinName.name = pairValue.name;
            coinName.money = pairValue.money;
            coinName.formatted = pairValue.formatted;
        }

        date.value = new Date().toString();
    }

    setValues();

    setInterval(setValues, 5000);
</script>

<template>
    <section>
        <coin-check :background="background" :coin="btc" />

        <coin-check :background="background" :coin="eth" />

        <coin-check v-if="pair" :background="background" :coin="coinName" />
    </section>

    <div class="sub">
        Last Update: <span>{{ date }}</span>
    </div>
</template>

<style>
    /* COIN TRACKER */
    section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        font-size: 2.5rem;
        margin: 0 auto;
        gap: 1rem;
    }
    .sub {
        font-size: 14px;
        font-weight: 900;
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }

    /* COIN CHECK */
    .inner {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px solid black;
        box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        padding: 10px;
        background-color: v-bind(background);
    }

    .price-info {
        display: flex;
        gap: 1.2rem;
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }
    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    /* ARROW CHECKER */
    svg {
        width: 30px;
    }
    .up {
        fill: green;
    }
    .down {
        fill: red;
    }
</style>
