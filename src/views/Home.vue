<template>
  <div class="">
     <NavBar ref="navbar"></NavBar>
     <div class="">
         <br>
         <br>
         <br>
         <br>
         <div class="row">
           <div class="col-3">
              <SideBar></SideBar>
            </div>
            <div class="col-9">
               <router-view></router-view>
            </div>
         </div>
      </div>
  </div>
</template>

<script>
import NavBar from '../components/common/NavBar.vue'
import SideBar from '../components/common/SideBarHome.vue'
export default {
    components:{
       NavBar,
       SideBar,
    },
    data(){
       return{
         allUsers: [],
         suggestedAccounts: []
       }
    },
    methods:{
       getSuggestedAccounts(){
           this.suggestedAccounts = this.$refs.navbar.suggestedAccounts
       },
        getAllUsers()
        {
            this.allUsers = this.$refs.navbar.allUsers
        }   
    },
    mounted(){
         this.$nextTick(() => {
            this.getAllUsers();
            this.getSuggestedAccounts();
         })
    }
}
</script>

<style>
</style>