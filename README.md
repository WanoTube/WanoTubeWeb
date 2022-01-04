# Watch Out Web
A sharing video platform, which provides numerous features, using VueJS framework for building our own website application. 
Also, we're using Bootstrap 4 and Vuetify library for quickly design and customize responsive mobile-first sites responsive.
This is our front-end repository. You can find more about back-end's information in this link: https://github.com/nguyendacthienngan/WatchOutServer

Currently, we're hosting in local port 8080.

Installation steps:

    npm install
    npm run serve

Project Structure:


      ├── build                   # Compiled files
      ├── docs                    # Documentation files
      ├── src                     # Source files
      │   ├── assets              
      │   ├── components
      │   │   └── comment
      │   │   │   └── Comment.vue
      │   │   │   └── CommentSection.vue
      │   │   └── common
      │   │   │   └── Button.vue
      │   │   │   └── CommentBar.vue
      │   │   │   └── DropAnImage.vue
      │   │   │   └── NavBar.vue
      │   │   │   └── SearchBar.vue
      │   │   │   └── SideBarDetailEditing.vue
      │   │   │   └── SideBarEditing.vue
      │   │   │   └── SideBarHome.vue
      │   │   │   └── ThumbnailVideo.vue
      │   │   │   └── TriggerUploadDialog.vue
      │   │   └── home
      │   │   │   └── Post.vue
      │   │   │   └── PostCaption.vue
      │   │   │   └── Posts.vue
      │   │   └── profile
      │   │   │   └── EditProfile.vue
      │   │   │   └── Profile.vue
      │   │   └── upload-video
      │   │   │   └── Upload.vue
      │   │   │   └── UploadStepOne.vue
      │   │   │   └── UploadStepThree.vue
      │   │   │   └── UploadStepTwo.vue
      │   │   └── user-management
      │   │   │   └── BlockConfirmation.vue
      │   │   │   └── ListUsers.vue
      │   │   └── video-management
      │   │   │   └── DeleteConfirmation.vue
      │   │   │   └── ListVideos.vue
      │   │   │   └── ShowRecognitionResult.vue
      │   │   │   └── VideoDetails.vue
      │   └── utils
      │   │   └── repository
      │   │   │   └── AuthRepository.js
      │   │   │   └── Repository.js
      │   │   │   └── RepositoryFactory.js
      │   │   │   └── UsersRepository.js
      │   │   │   └── VideosRepository.js
      │   │   utils.js
      │   └── views                
      │   │   └── Authentication.vue
      │   │   └── Comment.vue
      │   │   └── Editing.vue
      │   │   └── Home.vue
      │   │   └── PageNotFound.vue
      │   │   └── Register.vue
      │   │   └── UploadVideo.vue
      │   main.js
      │   routes.js
      ├── LICENSE
      └── README.md
