<template>
    <div class="side-bar-home ">
        <div class="filter-buttons container">
            <div class="filter-button-component d-none d-lg-block">
                <img src="../../assets/images/Home-Icon.svg" class="m-r-15">
                <b>Home</b>
            </div>
            <div class="filter-button-component d-none d-lg-block">
                <img src="../../assets/images/Users-Icon.svg" class="m-r-15" width="26px" height="26px">
                <b>Following</b>
            </div>
            <div class="filter-button-component d-lg-none">
                <img src="../../assets/images/Home-Icon.svg" class="m-r-15">
            </div>
            <div class="filter-button-component d-lg-none">
                <img src="../../assets/images/Users-Icon.svg" class="m-r-15" width="26px" height="26px">
            </div>
        </div>
        <div class="suggested-accounts">
            <Accounts title="Suggested Accounts:" :suggestedAccounts="this.$parent.$data.suggestedAccounts"></Accounts>
        </div>
    </div>
</template>
<script>
import Accounts from '../home/Accounts.vue'
export default {
    components: {
        Accounts
    }
}
</script>

<style src="../../assets/styles/sidebar-home.css">
</style>