<template>
    <div class="border rounded p-2"> 
        <slot />
        <div class="form-group">
            <label for="address1">Address</label>
            <input id="address1" type="text" class="form-control" placeholder="Address"
                v-model="model.address1.$model"
                v-bind:disabled="isDisabled" />

            <validation-message v-bind:model="model.address1" />
        </div>
        <div class="form-group">
            <label for="address2">Apartment</label>
            <input id="address2" type="text" class="form-control" placeholder="Address"
                v-model="model.address2.$model"
                v-bind:disabled="isDisabled" />

            <validation-message v-bind:model="model.address2" />
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
              <label for="cityTown">City</label>
              <input 
                id="cityTown"
                type="text"
                class="form-control"
                placeholder="e.g. New York"
                v-model="model.cityTown.$model"
                v-bind:disabled="isDisabled"
              />
              <validation-message v-bind:model="model.cityTown" />
            </div>  
            <div class="form-group col-md-3">
              <label for="stateProvince">State</label>
              <select 
                  id="stateProvince"
                  class="form-control"
                  v-model="model.stateProvince.$model"
                  v-bind:disabled="isDisabled"
              >
                <option 
                 v-for="s in states" 
                 v-bind:key="s.abbreviation"
                 v-bind:value="s.abbreviation"
                >
                 {{ stateFormat(s) }}
                </option>               
              </select>
              <validation-message v-bind:model="model.stateProvince" />
            </div>
            <div class="form-group col-md-3">
              <label for="postalCode">ZipCode</label>
              <input 
                id="postalCode"
                type="text"
                class="form-control"
                placeholder="e.g. 10101"
                v-model="model.postalCode.$model"
                v-bind:disabled="isDisabled"
              />
              <validation-message v-bind:model="model.postalCode" />
            </div> 
        </div>
    </div>
</template>

<script>

import states from '@/lookup/states';
import formatters from '@/formatters';
import { required,minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import ValidationMessage from '@/components/ValidationMessage';

export default {
    components: {
      ValidationMessage
    },
    props: {
        address: {
            type: Object
        },
        isDisabled: {
            type:Boolean
        }
    },
    setup(props) {

        const rules = {
          address1: { required,minLength: minLength(5) },
          address2: {},
          cityTown: { required,minLength: minLength(2) },
          stateProvince: { required },
          postalCode: { required,minLength: minLength(5) }
        };

        const model = useVuelidate(rules,props.address);

        return {
            states,
            ...formatters,
            model
        };
    }
}
</script>