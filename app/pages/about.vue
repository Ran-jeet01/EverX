<script setup lang="ts"></script>

<template>
  <div class="home-page fade-in">
    <!-- Keeping your class names -->
    <section class="hero">
      <div class="container hero-content">
        <div class="hero-text animate-fade-in">
          <span class="hero-title">About Us</span>
          <span class="hero-subtitle">Our Philosophy</span>

          <p class="hero-desc">
            Discover our curated selection of premium essentials designed to
            inspire and endure. Limited edition pieces available now.
          </p>

          <div class="hero-cta">
            <NuxtLink to="/products" class="btn btn-primary">
              Shop Collection
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-outline"> Our Story </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about section-padding">
      <div class="container about-grid">
        <!-- Text -->
        <div class="about-text">
          <span class="about-eyebrow">This is</span>
          <h1 class="brand-name-large">Ever x</h1>

          <h2 class="about-title">
            Not just another<br />
            fashion brand.
          </h2>

          <p class="about-desc">
            We started Ever x because we were tired of "good enough." You know
            the feeling—clothes that look great online but fall apart after a
            month. We wanted something different.
          </p>

          <p class="about-desc">
            <b>Real stuff.</b> Built to be worn, washed, and loved. We don't do
            fast fashion drops or chase whatever's trending on TikTok this week.
            We make the gear we actually want to wear ourselves. Simplicity with
            a backbone.
          </p>

          <div class="about-values">
            <div class="value-card">
              <div class="icon-box">
                <Icon name="ri:ruler-2-line" size="24" class="text-green-600" />
              </div>
              <div class="value-content">
                <h4>No Fluff</h4>
                <p>
                  Just clean lines and cuts that fit right. Zero unnecessary
                  noise.
                </p>
              </div>
            </div>

            <div class="value-card">
              <div class="icon-box">
                <!-- <i class="ri-shield-check-line"></i> -->
                <Icon
                  name="ri:shield-check-line"
                  size="24"
                  class="text-green-600"
                />
              </div>
              <div class="value-content">
                <h4>Built Tough</h4>
                <p>Fabrics that can actually handle your daily grind.</p>
              </div>
            </div>

            <div class="value-card">
              <div class="icon-box">
                <Icon name="ri:earth-line" :size="24" class="text-green-600" />
              </div>
              <div class="value-content">
                <h4>Honest Work</h4>
                <p>Small batches. Fair play. No mass-produced garbage.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="about-image-wrapper">
          <div class="image-bg-decoration"></div>
          <img src="/dress.webp" alt="Brand philosophy" class="about-img" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url("/peak2.webp");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-subtitle {
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 600;
  opacity: 0.9;
  display: block;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.hero-desc {
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.hero-cta {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.btn {
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: white;
  color: black;
  border: 2px solid white;
}

.btn-primary:hover {
  background: transparent;
  color: white;
}

.btn-outline {
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
}

.btn-outline:hover {
  background: white;
  color: black;
}

/* About*/

.section-padding {
  padding: 8rem 0;
}

.about {
  background: white;
  position: relative;
  overflow: hidden;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.about-eyebrow {
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-color, #6366f1);
  margin-bottom: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.brand-name-large {
  font-size: 6rem;
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -3px;
  color: #0f172a;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.about-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2.5rem;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.about-desc {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #475569;
  margin-bottom: 2rem;
  max-width: 540px;
}

/* Values Cards */
.about-values {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 3.5rem;
}

.value-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.value-card:hover {
  background: white;
  transform: translateX(10px);
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.1);
  border-color: #e2e8f0;
}

.icon-box {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--accent-color, #6366f1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.value-card:hover .icon-box {
  background: var(--accent-color, #6366f1);
  color: white;
}

.value-content h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.value-content p {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

/* Image Section */
.about-image-wrapper {
  position: relative;
  z-index: 1;
}

.image-bg-decoration {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 100%;
  height: 100%;
  border: 3px solid #e2e8f0;
  border-radius: 24px;
  z-index: -1;
}

.about-img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: transform 0.5s ease;
  display: block;
}

.about-image-wrapper:hover .about-img {
  transform: scale(1.02);
}

/* responsive */

@media (max-width: 1024px) {
  .about-title {
    font-size: 3rem;
  }
  .brand-name-large {
    font-size: 5rem;
  }
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .about-image-wrapper {
    order: -1;
    margin-top: 2rem;
    margin-right: 2rem;
  }

  .image-bg-decoration {
    top: -20px;
    right: -20px;
  }

  .about-title {
    font-size: 2.5rem;
  }

  .brand-name-large {
    font-size: 4rem;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.8rem;
  }

  .section-padding {
    padding: 5rem 0;
  }

  .value-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .brand-name-large {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
}
</style>
