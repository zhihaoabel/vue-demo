<template>
  <div class="p-8">
    <h2 class="text-xl font-bold mb-4">Payment</h2>
    <p class="mb-4">All transactions are secure and encrypted.</p>

    <!-- Payment Options -->
    <div class="mb-4">
      <div class="payment-container grid grid-cols-2 mb-2">
        <div class="flex">
          <input id="credit-card" class="mr-2" name="payment-method" type="radio" value="credit-card"/>
          <label for="credit-card" class="">
            <span class="mr-2">Credit card</span>
          </label>
        </div>
        <span class="flex justify-content-end">
          <IconVisa class="w-6 h-6 mr-2"/>
          <IconMasterCard class="w-6 h-6 mr-2"/>
          <IconDiscover class="w-6 h-6 mr-2"/>
        </span>
      </div>
      <!-- Add other payment methods here -->
    </div>

    <!-- Credit Card Form -->
    <div class="mb-4">
      <label for="card-number" class="font-bold mb-2 block">Card Number</label>
      <input type="text" id="card-number" placeholder="1234 1234 1234 1234" class="border p-2 w-full"/>
    </div>
    <!-- Expiration Date and CVC -->
    <div class="flex mb-4">
      <div class="mr-2 flex-1">
        <label for="exp-date" class="font-bold mb-2 block">Expiration Date (MM/YY)</label>
        <input type="text" id="exp-date" placeholder="MM/YY" class="border p-2 w-full"/>
      </div>
      <div class="flex-1">
        <label for="cvc" class="font-bold mb-2 block">CVC</label>
        <input type="text" id="cvc" placeholder="CVC" class="border p-2 w-full"/>
      </div>
    </div>

    <!-- Name on Card -->
    <div class="mb-4">
      <label for="full-name" class="font-bold mb-2 block">Full Name</label>
      <input type="text" id="full-name" placeholder="Full Name" class="border p-2 w-full"/>
    </div>

    <!-- Submit Button -->
    <button class="bg-blue-600 text-white p-2 w-full rounded-2">Pay Now</button>
  </div>
</template>

<script>
import IconVisa from "@/components/icons/IconVisa.vue";
import IconDiscover from "@/components/icons/IconDiscover.vue";
import IconMasterCard from "@/components/icons/IconMasterCard.vue";

export default {
  name: 'payment',
  components: {IconMasterCard, IconDiscover, IconVisa},
  // Add your script here
}
</script>

<style scoped>
/* Add any additional CSS if needed, though Tailwind CSS classes should suffice */
</style>
