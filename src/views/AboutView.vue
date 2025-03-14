<template>
  <div class="spacer"></div>
  <div class="about-page">
    <h1>About This Application</h1>

    <section class="intro">
      <p>
        This is a personal project that I made for a technical assessment when
        applying to
        <strong
          ><a target="blank" href="https://www.digimsolution.com/"
            >DigiM</a
          ></strong
        >. These were the requirements of the assessment:
      </p>
      <div class="spacer"></div>
      <p>
        Please design and implement an image uploading and display service using
        Python and Django. This service offers the following features, all
        accessible only through REST API:
      </p>
      <ul>
        <li>
          <strong>1.</strong> Users can create folder by specifying a folder
          name.
        </li>
        <li>
          <strong>2.</strong> After creating a folder, users can upload images
          into it.
        </li>
        <li><strong>3.</strong> Users can retrieve a list of folders.</li>
        <li>
          <strong>4.</strong> Users can retrieve a list of images within a
          folder.
        </li>
        <li>
          <strong>5.</strong> For each image, the system should be able to
          display the image and provide information, including:
          <ul>
            <li>- Image size (width, height)</li>
            <li>- Image file size</li>
            <li>- Whether it’s a color or grayscale image</li>
            <li>- Upload date and time</li>
          </ul>
        </li>
      </ul>
      <div class="spacer"></div>

      <p>
        I have fulfilled the basic requirements of the task. It was not
        specified if a front-end was required, so in addition to the Django
        tests, this simple client application serves as an example of the REST
        API in action.
      </p>
    </section>
    <section class="intro">
      <p>
        The REST API consists of User, Folder, and File Models. This is a very
        simple file managing application, so only those three were necessary for
        the basic requirements. Their interactions are diagramed below:
      </p>
      <div class="spacer"></div>
      <div class="img-container">
        <img src="../assets/REST_diagram.png" alt="REST API Diagram" />
      </div>
      <div class="spacer"></div>
      <p>
        Users can own folders and files. Each user simply has authentication
        credentials like username and password. Users are also tied to a Token
        for secure access. This app uses JWT Tokens and sends them over secure
        http only requests. This is a secure method of authentication for this
        app, as users can potentially upload private images.
      </p>
      <div class="spacer"></div>
      <p>
        Users can have many folders, but a folder can only have one User.
        Folders are linked to users by UUID. Folders have a field called parent
        folder. This is so directories can be represented as a tree system.
        Referencing parent_folder acts as a connector to each node.
      </p>
      <div class="spacer"></div>
      <p>
        Files are linked by both User and folder. This is for querying images
        based on the authenticated user and the folder that it lies in. This can
        also help if a user uploads identical images. The server can distinguish
        them by the folder that they lie in.
      </p>
      <p>Below is a UML diagram of each model.</p>
      <div class="spacer"></div>
      <div class="img-container">
        <img src="../assets/REST_UML.png" alt="REST API UML" />
      </div>
      <div class="spacer"></div>
      <p>
        The reason that files and folders were kept in the same app was because
        they are tightly coupled and this project is currently small enough that
        it made it easier to work with the code. They of course can be separated
        out into their own respective Django apps, and that would not be a bad
        idea if this app were to grow and the logic becomes more complex.
        However, for right now this structure fits the intended purposes.
      </p>
      <div class="spacer"></div>
      <p>
        Scaling this API should not be too difficult. One of the stretch goals
        was to include an organization model. A user could be a part of an
        organization, or just as a single user. Organizations would have their
        own access to folders and images, and would be queried with organization
        fields. To implement this model would require adding some extra
        ForeignKeys to User, Folder, and File, as well as some updated querying
        logic (querying on org or user).
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutView",
});
</script>

<style scoped>
.about-page {
  margin-top: 60px;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

.about-page h1,
.about-page h2 {
  margin-bottom: 1rem;
}

.intro,
.mission,
.features,
.why-built,
.team,
.cta {
  margin-bottom: 2rem;
}

.subtitle {
  margin: 1rem 0;
  font-size: 1.2rem;
  color: #555;
}

ul,
ol {
  margin-left: 1.5rem;
}

a {
  color: #005fcc;
}

a:hover {
  text-decoration: underline;
}

.spacer {
  margin: 50px;
}
</style>
