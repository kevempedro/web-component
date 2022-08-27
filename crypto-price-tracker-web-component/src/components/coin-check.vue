<script lang="ts" setup>
    import { toRefs } from 'vue';

    import ArrowChecker from './arrow-checker.vue';

    const props =  defineProps<{
        coin: {
            money: number;
            formatted: string;
            name: string;
        };
        background: string;
    }>();

    const { coin } = toRefs(props);
</script>

<template>
    <Transition mode="out-in">
        <div class="inner" :key="coin.formatted">
            {{ coin.name }}

            <div class="price-info">
                <span>
                    {{ coin.formatted }}
                </span>

                <arrow-checker :name="coin.name" :amount="coin.money" />
            </div>
        </div>
    </Transition>
</template>

<style scoped>
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
</style>
