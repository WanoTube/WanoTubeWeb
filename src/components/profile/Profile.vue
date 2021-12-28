<template>
    <div>
        <NavBar></NavBar>
        <br><br><br>
        <div class="container">
            <div class="row ">
                <div class="col-5 text-right">
                    <img 
                    class="rounded-circle img-responsive"
                    src="../../assets/images/Account.png" 
                    width="150px" height="150px">
                </div>
                <div class="col-7">
                    <div>
                        <h5>heoboi</h5>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import NavBar from '../common/NavBar.vue'
export default {
    components: {
        NavBar
    }
}
</script>