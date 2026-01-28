<script setup lang="ts">
// Layout is handled by middleware or can be set statically
// definePageMeta cannot access reactive composable values
</script>

<template>
  <div class="animate-[fadeIn_0.5s_ease-out]">
    <section
      class="min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center text-white text-center relative overflow-hidden"
      style="
        background-image:
          linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
          url(&quot;/peak2.webp&quot;);
      "
    >
      <div class="container max-w-[800px] mx-auto">
        <div class="w-full animate-[fadeIn_0.8s_ease_forwards]">
          <span
            class="text-[5rem] font-extrabold mb-8 drop-shadow-lg block max-w-full leading-tight md:text-[5rem] text-[2.8rem]"
            >About Us</span
          >
          <span
            class="uppercase tracking-[4px] font-semibold opacity-90 block mb-6"
            >Our Philosophy</span
          >

          <p class="text-xl leading-relaxed max-w-[600px] mx-auto mb-12">
            Discover our curated selection of premium essentials designed to
            inspire and endure. Limited edition pieces available now.
          </p>

          <div class="flex gap-6 justify-center">
            <NuxtLink
              to="/products"
              class="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-full transition-all duration-300 no-underline text-base bg-white text-black border-2 border-white hover:bg-transparent hover:text-white"
            >
              Shop Collection
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-full transition-all duration-300 no-underline text-base border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-black hover:border-white"
            >
              Our Story
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-24 md:py-32 bg-white relative overflow-hidden">
      <div
        class="container grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center"
      >
        <!-- Text -->
        <div class="order-2 md:order-1">
          <span
            class="uppercase tracking-[4px] text-sm font-bold text-accent mb-2 block"
            >This is</span
          >
          <h1
            class="text-[3rem] md:text-[5rem] lg:text-[6rem] font-black leading-[0.9] -tracking-[3px] text-slate-900 mb-8 uppercase"
          >
            Ever x
          </h1>

          <h2
            class="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-extrabold leading-[1.1] mb-10 text-slate-900 -tracking-tight"
          >
            Not just another<br />
            fashion brand.
          </h2>

          <p class="text-lg leading-relaxed text-slate-600 mb-8 max-w-[540px]">
            We started Ever x because we were tired of "good enough." You know
            the feeling—clothes that look great online but fall apart after a
            month. We wanted something different.
          </p>

          <p class="text-lg leading-relaxed text-slate-600 mb-8 max-w-[540px]">
            <b>Real stuff.</b> Built to be worn, washed, and loved. We don't do
            fast fashion drops or chase whatever's trending on TikTok this week.
            We make the gear we actually want to wear ourselves. Simplicity with
            a backbone.
          </p>

          <div class="flex flex-col gap-6 mt-14">
            <div
              class="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl transition-all duration-300 border border-transparent hover:bg-white hover:translate-x-2.5 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] hover:border-slate-200 group max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4"
            >
              <div
                class="w-[50px] h-[50px] bg-white rounded-xl flex items-center justify-center text-2xl text-accent shadow-sm shrink-0 transition-colors group-hover:bg-accent group-hover:text-white"
              >
                <Icon name="ri:ruler-2-line" size="24" class="text-inherit" />
              </div>
              <div>
                <h4 class="text-lg font-bold text-slate-800 mb-1">No Fluff</h4>
                <p class="text-[0.95rem] text-slate-500 leading-normal m-0">
                  Just clean lines and cuts that fit right. Zero unnecessary
                  noise.
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl transition-all duration-300 border border-transparent hover:bg-white hover:translate-x-2.5 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] hover:border-slate-200 group max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4"
            >
              <div
                class="w-[50px] h-[50px] bg-white rounded-xl flex items-center justify-center text-2xl text-accent shadow-sm shrink-0 transition-colors group-hover:bg-accent group-hover:text-white"
              >
                <Icon
                  name="ri:shield-check-line"
                  size="24"
                  class="text-inherit"
                />
              </div>
              <div>
                <h4 class="text-lg font-bold text-slate-800 mb-1">
                  Built Tough
                </h4>
                <p class="text-[0.95rem] text-slate-500 leading-normal m-0">
                  Fabrics that can actually handle your daily grind.
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl transition-all duration-300 border border-transparent hover:bg-white hover:translate-x-2.5 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] hover:border-slate-200 group max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-4"
            >
              <div
                class="w-[50px] h-[50px] bg-white rounded-xl flex items-center justify-center text-2xl text-accent shadow-sm shrink-0 transition-colors group-hover:bg-accent group-hover:text-white"
              >
                <Icon name="ri:earth-line" :size="24" class="text-inherit" />
              </div>
              <div>
                <h4 class="text-lg font-bold text-slate-800 mb-1">
                  Honest Work
                </h4>
                <p class="text-[0.95rem] text-slate-500 leading-normal m-0">
                  Small batches. Fair play. No mass-produced garbage.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="relative z-10 mt-8 mr-8 md:mt-0 md:mr-0 order-1 md:order-2 group"
        >
          <div
            class="absolute -top-5 -right-5 w-full h-full border-[3px] border-slate-200 rounded-3xl -z-10 md:-top-10 md:-right-10 max-[900px]:-top-5 max-[900px]:-right-5"
          ></div>
          <img
            src="/dress.webp"
            alt="Brand philosophy"
            class="w-full h-auto rounded-3xl shadow-2xl transition-transform duration-500 block group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  </div>
</template>
