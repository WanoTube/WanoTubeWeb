<template>
    <div>
        <NavBar></NavBar>
        <br><br><br><br>
        <div class="container">
            <div class="row ">
                <div class="col-sm-4  avatar-profile">
                    <img 
                    class="rounded-circle img-responsive"
                    src="../../assets/images/Account.png" 
                    width="150px" height="150px">
                </div>
                <div class="col-sm-7">
                    <div class="row">
                        <div class="col-sm-3"  style="padding-top: 20px">
                            <h4 class="username " style="margin-bottom: 0; padding-bottom: 0">heoboi</h4>
                        </div>
                        <div class="col-sm-9">
                            <button type="button" class="btn btn-outline-secondary" >
                           Edit Profile
                        </button>
                        </div>
                    </div>
                    <div style="margin-top: 15px">
                        <span><b>Nguyễn Đắc Thiên Ngân</b></span>
                        <p>{{caption}}</p>
                    </div>
                    
                </div>
            </div>
            <br>
            <hr/>
            <div class="row">
                <div class="col-4 video-feed">
                    <LazyVideo :src="src"  />
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
    },
    data() {
        return {
            caption: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        }
    }
}
</script>
<style>
.btn-outline-secondary{
    color: black !important;
    font-weight: 500 !important;
    border-color: #dbdbdb !important;
    /* padding: 0 !important; */
    font-size: 14px !important;
}
.username {
    font-weight: 400;
}
.avatar-profile  {
    text-align: center;
}
@media only screen and (min-width: 960px) {
    .btn-outline-secondary{
    }
    .avatar-profile {
        text-align: right !important;
    }
}
</style>