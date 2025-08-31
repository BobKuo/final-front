<template>
  <div class="projects-section">
    <div class="container">
      <h2 class="section-title">Featured Projects</h2>

      <div class="projects-grid">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="project-item"
          :class="{ reverse: index % 2 === 1 }"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave(index)"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" class="main-image" />
            <div class="image-overlay"></div>
          </div>

          <div class="project-content">
            <div class="project-category">{{ project.category }}</div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <button class="project-link">
              <span>View Project</span>
              <svg class="arrow-icon" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = ref([
  {
    id: 1,
    title: 'Mountain Resort Branding',
    category: 'Branding & Identity',
    description:
      'Complete brand identity design for a luxury mountain resort, including logo design, color palette, and brand guidelines.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Forest Conservation Website',
    category: 'Web Design',
    description:
      'Responsive website design for an environmental organization focused on forest conservation and sustainability initiatives.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Nature Photography Portfolio',
    category: 'Portfolio Design',
    description:
      'Clean and minimalist portfolio website showcasing stunning nature photography with smooth transitions and galleries.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Outdoor Adventure App',
    category: 'UI/UX Design',
    description:
      'Mobile app design for outdoor enthusiasts, featuring trail maps, weather updates, and community features.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
  },
])

onMounted(() => {
  // 滾動觸發動畫
  gsap.fromTo(
    '.project-item',
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    },
  )

  // 圖片視差效果
  gsap.utils.toArray('.project-image img').forEach((img) => {
    gsap.fromTo(
      img,
      { scale: 1.2 },
      {
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: img.closest('.project-item'),
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 1,
        },
      },
    )
  })
})

const handleMouseEnter = (index) => {
  const item = document.querySelectorAll('.project-item')[index]
  const image = item.querySelector('.main-image')
  const overlay = item.querySelector('.image-overlay')
  const content = item.querySelector('.project-content')

  gsap.to(image, { scale: 1.1, duration: 0.6, ease: 'power2.out' })
  gsap.to(overlay, { opacity: 0.3, duration: 0.3 })
  gsap.to(content, { y: -10, duration: 0.3 })
}

const handleMouseLeave = (index) => {
  const item = document.querySelectorAll('.project-item')[index]
  const image = item.querySelector('.main-image')
  const overlay = item.querySelector('.image-overlay')
  const content = item.querySelector('.project-content')

  gsap.to(image, { scale: 1, duration: 0.6, ease: 'power2.out' })
  gsap.to(overlay, { opacity: 0, duration: 0.3 })
  gsap.to(content, { y: 0, duration: 0.3 })
}
</script>

<style scoped lang="scss">
.projects-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 80px;
  color: #2d3436;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #6c5ce7, #a29bfe);
    border-radius: 2px;
  }
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 120px;
}

.project-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;

  &.reverse {
    .project-image {
      order: 2;
    }
    .project-content {
      order: 1;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;

    &.reverse {
      .project-image,
      .project-content {
        order: unset;
      }
    }
  }
}

.project-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  .main-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #6c5ce7, #a29bfe);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.project-content {
  padding: 0 20px;

  .project-category {
    font-size: 0.9rem;
    font-weight: 600;
    color: #6c5ce7;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 2px;
      background: #6c5ce7;
    }
  }

  .project-title {
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 700;
    color: #2d3436;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .project-description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #636e72;
    margin-bottom: 30px;
  }

  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    background: linear-gradient(135deg, #6c5ce7, #a29bfe);
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #a29bfe, #6c5ce7);
      transition: left 0.3s ease;
      z-index: -1;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 40px rgba(108, 92, 231, 0.3);

      &::before {
        left: 0;
      }

      .arrow-icon {
        transform: translateX(4px);
      }
    }

    .arrow-icon {
      width: 20px;
      height: 20px;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: transform 0.3s ease;
    }
  }
}

// 響應式設計
@media (max-width: 1024px) {
  .projects-section {
    padding: 80px 0;
  }

  .projects-grid {
    gap: 80px;
  }

  .project-item {
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .projects-section {
    padding: 60px 0;
  }

  .section-title {
    margin-bottom: 60px;
  }

  .projects-grid {
    gap: 60px;
  }

  .project-content {
    padding: 0;

    .project-category::before {
      display: none;
    }
  }

  .project-image .main-image {
    height: 300px;
  }
}
</style>
