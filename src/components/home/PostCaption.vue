<template>
    <div class="d-flex">
        <div class="avatar">
            <img :src="`http://localhost:8000/v1/users/avatar/${avatar_img}`" width="41px" height="41px" class="img-responsive rounded-circle"/>
        </div>
        <div>
            <div class="row">
                <div class="col" style="padding-bottom: 0">
                    <b>{{name}}</b>
                    <br>
                    {{caption}}
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['name', 'caption', 'bg_music', 'avatar_img','isPost']
}
</script>
<style src="../../assets/styles/post-caption.css">

</style>