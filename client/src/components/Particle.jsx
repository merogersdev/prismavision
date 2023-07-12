import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

export default function Particle() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    return await container;
  }, []);

  const options = {
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    background: {
      color: {
        value: '#fff',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
        detectsOn: 'window',
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 50,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#ddd',
      },
      links: {
        color: '#ddd',
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        directions: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 200,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className='z-0'>
      <Particles
        id='tsparticles'
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />
    </div>
  );
}
