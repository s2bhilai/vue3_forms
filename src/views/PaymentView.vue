<template>
  <div>
    <h3>Payment</h3>
    <!-- <error-message v-bind:message="error"></error-message> -->
    <form novalidate v-on:submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <div><strong>Shipping Information</strong></div>
                 
          <address-view v-bind:address="payment.shipping">
            <div class="form-group">
             <label for="name">Name</label>
             <input id="name" type="text" class="form-control" 
                placeholder="Your Name" 
                v-model="payment.shipping.fullName" />
            </div>
            <div class="form-group">
             <label for="company">Company Name</label>
             <input id="company" type="text" class="form-control" placeholder="Company"
                  v-model="payment.shipping.company" />
            </div>
          </address-view>

          <div class="form-group">
            <input type="submit" value="Next" class="btn btn-success" 
                 v-bind:disabled="creditCardModel.$invalid" />
          </div>
        </div>
        <div class="col-md-6">
          <div><strong>Billing Information</strong></div>
                
          <address-view 
               v-bind:address="payment.billing" 
               v-bind:isDisabled="payment.billing.sameAsShipping">
          
           <div class="form-check">
             <input type="checkbox" id="sameAsShipping" class="form-check-input"
              v-model="payment.billing.sameAsShipping" />
             <label for="sameAsShipping" class="form-check-label">Same As Shipping?</label>
           </div>
             
          </address-view>
          
          <div><strong>Credit Card</strong></div>
          <div class="form-group">
            <label for="ccNumber">Credit Card Number</label>
            <input 
              class="form-control" type="text" 
              v-model="creditCardModel.number.$model"
              id="ccNumber" 
            />  
            <validation-message v-bind:model="creditCardModel.number"></validation-message>        
          </div>
          <div class="form-group">
            <label for="nameOnCard">Name on Card</label>
            <input 
              class="form-control"
              type="text"
              v-model="creditCardModel.nameOnCard.$model"
              id="nameOnCard"
            />
            <validation-message v-bind:model="creditCardModel.nameOnCard"></validation-message>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="expirationMonth">Expiration Month</label>
              <select v-model="creditCardModel.expirationMonth.$model" class="form-control">
                <option v-for="month in months" 
                  v-bind:key="month.number"
                  v-bind:value="month.number">
                  {{ month.name }}
                </option>
              </select>
              <validation-message v-bind:model="creditCardModel.expirationMonth"></validation-message>
            </div>
            <div class="form-group col-md-4">
              <label for="expirationMonth">Expiration Year</label>
              <select v-model="creditCardModel.expirationYear.$model" class="form-control">
                <option v-for="year in years" 
                  v-bind:key="year"
                  v-bind:value="year">
                  {{ year }}
                </option>
              </select>
              <validation-message v-bind:model="creditCardModel.expirationYear"></validation-message>
            </div>
            <div class="form-group col-md-4">
              <label for="cvv">CVV Code</label>
              <input 
                v-model="creditCardModel.cvv.$model" 
                class="form-control" 
                id="cvv"
              />
              <validation-message v-bind:model="creditCardModel.cvv"></validation-message>  
            </div>
          </div>         
        </div>
      </div>
    </form>
    <div>
      <pre>{{payment}}</pre>
      <pre>{{creditCardModel}}</pre>
    </div>
  </div>
</template>


<script>

import { ref,computed, watch, reactive } from 'vue';
import states from '@/lookup/states';
import formatters  from '@/formatters/index';
import months from '@/lookup/months';
import AddressView from './AddressView';
import state from '@/state';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import ValidationMessage from '../components/ValidationMessage';
import { creditcard } from '@/validators';

export default {
  components: {
      AddressView,
      ValidationMessage
  },
  emits: [
      "onError"
  ],
  setup(props,{emit}) {

   const payment = reactive(state);

    async function onSave() {
      //emit("onError","We can't save yet.");
      if(await creditCardModel.value.$validate()) {
        state.errorMessage.value = "cant save";
      }     
    }

    const zipCode = computed({
      get: () => payment.postalCode,
      set: (val) => {
        if(val && typeof val === "string") {
          if(val.length <= 5 || val.indexOf("-") > -1) {
            payment.postalCode = val;
          } else {
            payment.postalCode = `${val.substring(0,5)}-${val.substring(5)}`
          }
        }
      }
    });

    watch(() => payment.billing.sameAsShipping,
    () => {
      if(payment.billing.sameAsShipping.value) {
        payment.clear();
      }
    });

    const years = Array.from({length:10},(_,i) => i+2020); 

    const rules = {
      number : { required,creditcard },
      nameOnCard : { required },
      expirationMonth : { required },
      expirationYear : { required },
      cvv : { required }
    };

    const creditCardModel = useVuelidate(rules,state.creditcard);

    return {
      payment,
      creditCardModel,
      states,
      onSave,
      ...formatters,
      zipCode,
      months,
      years
    };
  }
}
</script>












