<template>
  <div class="home">
    <!-- Hero Section (existing) -->
    <section class="hero">
      <div class="hero-content">
        <h1>Digibox</h1>
        <p class="subtitle">
          Store, Organize, and Explore Your Images—Effortlessly.
        </p>
        <button class="btn hero-cta" @click="navigateToSignup">
          Get Started
        </button>
      </div>
      <div
        data-w-id="896b43cd-8d2c-31ee-b6f7-5e503aad7844"
        style="opacity: 0.6"
        class="section_background"
      >
        <video
          data-lazy-load="true"
          data-src="https://cdn.jsdelivr.net/gh/jesse-shauffer/media/digim_home_hero-hd_1080p 720p.mp4"
          autoplay="true"
          loop=""
          playsinline="true"
          muted=""
          poster="https://cdn.prod.website-files.com/65fb498612c9078be4da8758/66032ff3a6de799afcba09bc_DigiM%20Home%20Hero.jpg"
          overflow="hidden"
          class="my-video hero"
          src="https://cdn.jsdelivr.net/gh/jesse-shauffer/media/digim_home_hero-hd_1080p 720p.mp4"
          data-loaded="true"
          data-video="0"
        ></video>
        <video
          data-lazy-load="true"
          data-src="https://cdn.jsdelivr.net/gh/jesse-shauffer/media/digim_home_hero-hd_1080p 720p.mp4"
          autoplay="true"
          loop=""
          playsinline="true"
          muted=""
          poster="https://cdn.prod.website-files.com/65fb498612c9078be4da8758/66032ff3a6de799afcba09bc_DigiM%20Home%20Hero.jpg"
          overflow="hidden"
          class="my-video hero"
          src="https://cdn.jsdelivr.net/gh/jesse-shauffer/media/digim_home_hero-hd_1080p 720p.mp4"
          data-loaded="true"
          data-video="0"
        ></video>
      </div>
    </section>

    <!-- About Section (extended content for image file storage service) -->
    <section class="about">
      <div class="container">
        <h2>About Our Image Manager</h2>
        <p>
          Welcome to our image file storage service! We believe
          <strong>simplicity</strong> and <strong>security</strong> are the
          cornerstones of managing digital assets. Our platform provides a
          clean, intuitive interface for uploading, organizing, and sharing
          image files— empowering individuals and teams to stay productive
          without wrestling with cumbersome workflows or storage limits.
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2>Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>Folder & File Organization</h3>
            <p>
              Create, rename, and structure folders in a way that fits your
              workflow. Drag-and-drop uploads make adding images
              instantaneous—no complicated dashboards required.
            </p>
          </div>
          <div class="feature-card">
            <h3>Secure Access</h3>
            <p>
              With token-based auth and HTTP-only cookies, only authorized
              teammates can log in and manage files. Optional encryption at rest
              adds extra protection.
            </p>
          </div>
          <div class="feature-card">
            <h3>On-the-Fly Previews</h3>
            <p>
              Glance at an image’s metadata—dimensions, file size, color
              space—without downloading large files or opening external apps.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="about">
      <div class="container">
        <h2>Our Mission</h2>
        <p>
          We set out to build an <strong>image manager</strong> that balances
          power and ease of use. Whether you’re a solo designer storing sketches
          or a growing business archiving marketing assets, our platform
          seamlessly scales to your needs. We aim to:
        </p>
        <ul>
          <li><strong>Streamline</strong> how you store and access images</li>
          <li>
            <strong>Simplify</strong> folder creation and file organization
          </li>
          <li>
            <strong>Safeguard</strong> your data with robust security measures
          </li>
        </ul>
      </div>
    </section>

    <!-- Testimonials Section (existing) -->
    <section class="testimonials">
      <div class="container">
        <h2>What Our Customers Say</h2>
        <div class="testimonial-list">
          <article class="testimonial">
            <blockquote>
              “This product transformed our business. We saw a 50% increase in
              efficiency!”
            </blockquote>
            <cite>- Alex, CEO of StartX</cite>
          </article>
          <article class="testimonial">
            <blockquote>
              “The support team is fantastic. They helped us get set up in no
              time.”
            </blockquote>
            <cite>- Mia, CTO of InnovateCo</cite>
          </article>
          <article class="testimonial">
            <blockquote>
              “A game-changer for our marketing workflows—couldn't imagine going
              back!”
            </blockquote>
            <cite>- Jordan, Head of Marketing at MediaMax</cite>
          </article>
        </div>
      </div>
    </section>

    <!-- Call to Action Section (existing) -->
    <section class="cta">
      <div class="container">
        <h2>Ready to See Results?</h2>
        <p>
          Join thousands<sup>*</sup> of teams who rely on our product to
          accelerate their growth.
        </p>
        <button class="btn cta-btn" @click="navigateToSignup">
          Try It Free
        </button>
      </div>
      <div>
        <p class="small">
          <sup>*Up to thousands</sup>
        </p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomeView",
  setup() {
    const router = useRouter();
    function navigateToSignup() {
      router.push("/signup");
    }

    return {
      navigateToSignup,
    };
  },
});
</script>

<style scoped>
/* Basic resets & container (optional, if not using global CSS) */
*,
*::before,
*::after {
  box-sizing: border-box;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.home {
  background: var(--color-brand--light-purple-20, #f4f2f8);
  padding-bottom: 2rem; /* ensure there's some space below */
}

/* ---------- Hero Section ---------- */
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(
    to bottom right,
    var(--color-brand--light-purple-20, #f4f2f8),
    var(--color-neutral--neutral-lightest, #ffffff)
  );
  color: var(--color-brand--dark-blue);
  padding: 80px 0;
  height: 100vh;
}
.hero-content {
  max-width: 600px;
}
.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.subtitle {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.hero-cta {
  background-color: #fff;
  color: #4f0fe5;
  font-weight: bold;
  height: 70px;
}

.section_background {
  z-index: -1;
  pointer-events: none;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
  overflow: hidden;
}
.my-video.hero {
  overflow: hidden;
}
.my-video {
  object-fit: cover;
  width: 100%;
  height: 100%;
  padding: 0;
  position: absolute;
  inset: 0%;
}
audio,
canvas,
progress,
video {
  vertical-align: baseline;
  display: inline-block;
}

/* ---------- About Section (extended) ---------- */
.about {
  padding: 60px;
  background-color: #f9f9f9;
  color: #000000;
}

.about h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.about p,
.about ul,
.about ol {
  max-width: 800px;
  margin: 0.5rem auto;
  line-height: 1.6;
}
.about ul,
.about ol {
  /* margin-left: 2rem; indent bullet/number lists */
}
.about h3 {
  margin-top: 2rem;
  font-size: 1.4rem;
}

/* ---------- Features Section (existing) ---------- */
.features {
  padding: 60px 0;
  background-color: #fff;
  color: #333;
}
.features h2 {
  text-align: center;
  margin-bottom: 2rem;
}
.features-grid {
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  justify-content: center;
}
.feature-card {
  z-index: 1;
  border-radius: var(--radius--1-5);
  background-color: var(--color-neutral--white);
  grid-template-rows: auto;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  min-height: auto;
  display: grid;
  position: relative;
  box-shadow: 0 0.25rem 1rem #0000001a;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Bulge effect on hover */
.feature-card:hover {
  transform: scale(1.05); /* Smoothly grow on hover */
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15); /* Slightly deeper shadow for pop effect */
}

.feature-card h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

/* ---------- Testimonials Section (existing) ---------- */
.testimonials {
  padding: 60px 0;
  background-color: #f0f2f5;
  color: #333;
}
.testimonials h2 {
  text-align: center;
  margin-bottom: 2rem;
}
.testimonial-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}
.testimonial {
  border-left: 4px solid #4f0fe5;
  padding-left: 1rem;
  font-style: italic;
  line-height: 1.6;
}
.testimonial cite {
  display: block;
  margin-top: 0.5rem;
  font-weight: bold;
  font-style: normal;
}

/* ---------- CTA Section (existing) ---------- */
.cta {
  padding: 60px 0;
  background: linear-gradient(135deg, #ffffff, #f0f2f5);
  text-align: center;
}
.cta h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.cta-btn {
  background-color: #4f0fe5;
  color: #fff;
  padding: 0.75rem 2rem;
  font-size: 1.25rem;
  border-radius: 4px;
  margin-top: 1rem;
  height: 70px;
}

.small {
  font-size: 0.5rem;
}

/* ---------- Buttons & Utility ---------- */
.btn {
  display: inline-block;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
  text-align: center;
}
.btn:hover {
  opacity: 0.9;
}
</style>
