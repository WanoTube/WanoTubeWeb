<template>
    <div>
        <h1>Details</h1>
        <div class="row">
            <div class="col-8">
                <div>
                    <v-text-field
                        label="Title"
                        placeholder="Placeholder"
                        outlined
                    ></v-text-field>
                    <br>
                    <v-textarea
                        outlined
                        name="input-7-4"
                        label="Description"
                        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    ></v-textarea>
                </div>
            </div>
            <div class="col-4">
                <div class="card" style="width: 18rem;">
                    <div class="page-hero d-flex align-items-center justify-content-center">
                        <p>Processing video... </p>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-secondary">Video link </p>
                        <p>
                            <a class="card-text text-primary" href="https://getbootstrap.com/docs/4.0/content/typography/">https://getbootstrap.com/docs/4.0/content/typography/ </a>
                        </p>

                        <p class="card-text text-secondary">Filename </p>
                        <p class="card-text text-primary">Wonderland Party</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
 .card {

 }
 .page-hero {
  height: 150px;
  background-color: #E9E9E9;
}
</style>
<script>

export default {
    rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
}
</script>