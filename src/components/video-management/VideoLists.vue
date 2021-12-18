<template>
    <div>
        <NavBar></NavBar>
        <br><br>
        <div class="row">
            <div class="col-2 border-right">
                <br>
                <div class="text-center">
                    <img src="../../assets/images/Account.png" width="100px" height="100px">
                </div>
                <div class="text-center">
                    <br>
                    <p> <b>@heoboi</b></p>
                </div>
            </div>
            <div class="col-10">
                <br>
                <div class="container">
                    <h3>Video content</h3>
                </div>
                <br>
                <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="desserts"
                    :single-select="singleSelect"
                    item-key="name"
                    show-select
                    class="elevation-1"
                >
                    <template v-slot:top>
                    <!-- <v-switch
                        v-model="singleSelect"
                        label="Single select"
                        class="pa-3"
                    ></v-switch> -->
                    </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/common/NavBar.vue'

export default {
    components: {
        NavBar
    },
    data () {
      return {
        // singleSelect: false,
        selected: [],
        headers: [
          {
            text: 'Video',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { 
              text: 'Visibility', 
              value: 'calories',
              sortable: false
          },
          { 
              text: 'Date', 
              value: 'fat' 
          },
          { 
              text: 'Views', 
              value: 'carbs',
          },
          { 
              text: 'Comments', 
              value: 'protein'
          },
          { 
              text: 'Likes', 
              value: 'iron'
          },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      }
    },
    created() {
        
    }
}
</script>
