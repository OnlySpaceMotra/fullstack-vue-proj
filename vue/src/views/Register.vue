<template>
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
  </div>
  <form class="mt-8 space-y-6" @submit.prevent="register">
   <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
      {{ errorMsg }}
      <span @click="errorMsg = ''">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </span>
    </div>
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="fullname" class="sr-only">Full name</label>
            <input id="fullname" name="name" type="text" autocomplete="name" required="" v-model="user.name" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Full name" />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" v-model="user.email" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required="" v-model="user.password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
          <div>
            <label for="password_confirmation" class="sr-only">Password Confirmation</label>
            <input id="password_confirmation" name="password_confirmation" type="password" autocomplete="current-password" required="" v-model="user.password_confirmation" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password Confirmation" />
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="group w-40 relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
            Sign up
          </button>
        </div>
      </form>
  <p class="text-right">Have an account ?
    <router-link :to="{name: 'Login'}"
                 class="font-medium text-indigo-600 hover:text-indigo-500">Login
    </router-link>
  </p>
</template>

<script setup>
import store from '@/store'
import { LockClosedIcon } from '@heroicons/vue/solid'
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const router = useRouter();

const user = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
}

let errorMsg = ref('');

function register() {
  store
    .dispatch('register', user)
    .then(()=>{
      router.push({
        name: 'Dashboard'
        })
    }).catch(err => {
      errorMsg.value = err.response.data.message
    })
}
</script>

<style scoped>

</style>
