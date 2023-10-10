<script setup>

import IconWallet from "@/components/icons/IconWallet.vue";
import IconVisa from "@/components/icons/IconVisa.vue";
import IconMasterCard from "@/components/icons/IconMasterCard.vue";
import IconDiscover from "@/components/icons/IconDiscover.vue";
</script>

<template>
  <div class="card-container border-top rounded-2">
    <div class="title-info">
      <h6>Payment Method</h6>
      <span class="title-description">All transactions are secure and encrypted</span>
    </div>
    <div class="card" style="width: 18rem;">
      <!--      <img class="card-img-top" src="..." alt="Card image cap">-->
      <div class="card-body">
        <!--        <h5 class="card-title">Card title</h5>-->
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <IconWallet/>
          <span>Credit & Debit Card</span>
          <IconVisa/>
          <IconMasterCard/>
          <IconDiscover/>
        </li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>
      <div class="card-body">
        <a class="card-link" href="#">Card link</a>
        <a class="card-link" href="#">Another link</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.title-info h6 {
  color: #000000;
  font-size: 14px;
  font-weight: 600;
}

.title-info .title-description {
  font-size: 12px;
  color: var(--vt-c-text-light-2);
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