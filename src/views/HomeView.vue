<template>
  <main id="main-content" class="main" tabindex="-1">
    <!-- Hero - 100vh full screen -->
    <HeroSection />

    <!-- About -->
    <AboutSection />

    <!-- Why Us -->
    <WhyUsSection />

    <!-- Skills -->
    <SkillsSection />

    <!-- Services -->
    <ServicesSection />

    <!-- Call To Action -->
    <CtaSection />

    <!-- FAQ -->
    <FaqSection />

    <!-- Team (data dari siteData, foto di assets/img/teams/) -->
    <TeamSection />

    <!-- Contact + WhatsApp 2 tujuan -->
    <ContactSection />
  </main>
</template>

<script>
import HeroSection from "@/components/sections/HeroSection.vue"
import AboutSection from "@/components/sections/AboutSection.vue"
import WhyUsSection from "@/components/sections/WhyUsSection.vue"
import SkillsSection from "@/components/sections/SkillsSection.vue"
import ServicesSection from "@/components/sections/ServicesSection.vue"
import CtaSection from "@/components/sections/CtaSection.vue"
import FaqSection from "@/components/sections/FaqSection.vue"
import TeamSection from "@/components/sections/TeamSection.vue"
import ContactSection from "@/components/sections/ContactSection.vue"

export default {
  name: "HomeView",
  components: {
    HeroSection,
    AboutSection,
    WhyUsSection,
    SkillsSection,
    ServicesSection,
    CtaSection,
    FaqSection,
    TeamSection,
    ContactSection,
  },
}
</script>
