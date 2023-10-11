<script setup>

import IconWallet from "@/components/icons/IconWallet.vue";
import IconVisa from "@/components/icons/IconVisa.vue";
import IconMasterCard from "@/components/icons/IconMasterCard.vue";
import IconDiscover from "@/components/icons/IconDiscover.vue";
import ListItem from "@/components/list/ListItem.vue";
import CardBody from "@/components/card/CardBody.vue";
import DefaultSelect from "@/components/Select/DefaultSelect.vue";
</script>

<template>
  <div class="card-container border-top rounded-2">
    <div class="card">

      <CardBody
          card-class="card-body"
          card-header=""
          card-header-class="card-header"
          card-text="All transactions are secure and encrypted." card-title="Payment method">
        <template #img>
          <img alt="Card image cap" class="card-img-top"
               src="https://sandbox-v3-doc.pacypay.com/images/logo-f18b010b.png">
        </template>
      </CardBody>

      <ul class="list-group list-group-flush">
        <ListItem list-group-item-class="list-group-item">
          <div class="credit-card">
            <IconWallet/>
            <span>Credit & Debit Card</span>
            <span>
              <IconVisa/>
              <IconMasterCard/>
              <IconDiscover/>
            </span>
          </div>
        </ListItem>

        <ListItem list-group-item-class="list-group-item bg-body-secondary">
          <form action="sumbit" class="g-3">
            <div class="my-3">
              <input id="formGroupExampleInput" class="col form-control text-sm" placeholder="Card Number" type="text">
            </div>

            <div class="row my-3">
              <div class="col">
                <input aria-label="First name" class="form-control" placeholder="Expiration Date(MM/YY)" type="text">
              </div>
              <div class="col">
                <input aria-label="Last name" class="form-control" placeholder="Security Code(CVV)" type="text">
              </div>
            </div>

            <div class="row my-3">
              <div class="col">
                <input aria-label="First name" class="form-control" placeholder="Cardholder First Name" type="text">
              </div>
              <div class="col">
                <input aria-label="Last name" class="form-control" placeholder="Cardholder Last Name" type="text">
              </div>
            </div>
          </form>
        </ListItem>

        <ListItem list-group-item-class="list-group-item">
          <div class="d-flex flex-column">
<!--            <CardBody card-class="my-3"-->
<!--                      card-header=""-->
<!--                      card-header-class=''-->
<!--                      card-text="Select the address that matches your card or payment method."-->
<!--                      card-title="Billing Address"/>-->
<!--            <DefaultSelect aria-label="Billing Address" select-class="form-select form-select-sm">-->
<!--              <option value="1">Same as shipping address</option>-->
<!--              <option value="0">New billing address</option>-->
<!--            </DefaultSelect>-->
            <button class="btn btn-primary mt-5 " type="submit"> Complete Order</button>
          </div>
        </ListItem>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.list-group .credit-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.list-group .list-group-item {
  display: flex;
  align-items: center;
  justify-items: center;

}

.list-group .list-group-item span {
  font-family: 'Malgun Gothic', 'Open Sans', 'Nanum Barun Gothic', 'Helvetica Neue', 'Helvetica', 'Arial', '나눔바른고딕', '맑은고딕', 'Malgun Gothic', sans-serif;
  margin-left: 10px;
  font-weight: 600;
}
</style>