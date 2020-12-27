<template>
  <div>
    <error-message v-bind:message="errorMessage"></error-message>
    <payment-view></payment-view>
    <!-- v-on:onError="reportError" -->
  </div>
</template>

<script>

import PaymentView from '@/views/PaymentView';
import ErrorMessage from '@/components/ErrorMessage';
import {ref} from 'vue';
import state from '@/state';

export default {
  components: {
    PaymentView,
    ErrorMessage
  },
  setup() {

    const errorMessage = ref("");

    // function reportError(msg) {
    //   errorMessage.value = msg;
    // }

    return {
      //reportError,
      errorMessage: state.errorMessage
    }

  }
}
</script>