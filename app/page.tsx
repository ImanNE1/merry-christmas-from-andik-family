'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis';
import { 
  FaStar, 
  FaSnowflake, 
  FaGift, 
  FaHeart,
  FaTree,
  FaBell,
  FaCandyCane,
  FaCamera,
  FaMusic,
  FaPause,
  FaPlay,
  FaVolumeUp,
  FaVolumeMute
} from 'react-icons/fa';
import { 
  IoSparkles 
} from 'react-icons/io5';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// CONSTANTS
// ============================================
const FAMILY_NAME = "Andik Sulianto";
const GREETING_YEAR = "2025";
const NEW_YEAR = "2026";

// ============================================
// WELCOME SCREEN COMPONENT (for autoplay music)
// ============================================
const WelcomeScreen = ({ onEnter }: { onEnter: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Set initial states
    gsap.set('.welcome-star', { scale: 1, rotation: 0, opacity: 1 });
    gsap.set('.welcome-title', { y: 0, opacity: 1 });
    gsap.set('.welcome-subtitle', { y: 0, opacity: 1 });
    gsap.set('.welcome-btn', { scale: 1, opacity: 1 });

    // Animate elements
    const tl = gsap.timeline({
      onComplete: () => setIsAnimated(true)
    });
    
    tl.from('.welcome-star', {
      scale: 0,
      rotation: 180,
      duration: 1,
      ease: 'back.out(1.7)',
    })
    .from('.welcome-title', {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, '-=0.5')
    .from('.welcome-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.8,
    }, '-=0.5')
    .from('.welcome-btn', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.5');
  }, []);

  const handleEnter = () => {
    // Animate out
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: onEnter
    });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center px-4"
      style={{
        background: 'radial-gradient(ellipse at center, #0a1f26 0%, #051014 70%, #020508 100%)'
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-yellow-500/10 text-4xl"><FaStar /></div>
        <div className="absolute top-20 right-20 text-yellow-500/10 text-2xl"><FaStar /></div>
        <div className="absolute bottom-20 left-20 text-yellow-500/10 text-3xl"><FaStar /></div>
        <div className="absolute bottom-10 right-10 text-yellow-500/10 text-xl"><FaStar /></div>
        <div className="absolute top-1/3 left-5 text-white/5 text-5xl"><FaSnowflake /></div>
        <div className="absolute bottom-1/3 right-5 text-white/5 text-4xl"><FaSnowflake /></div>
      </div>

      {/* Content */}
      <div className="relative text-center max-w-lg mx-auto">
        {/* Star icon */}
        <div className="welcome-star mb-6">
          <FaStar 
            className="text-5xl md:text-6xl mx-auto"
            style={{ 
              color: '#D4AF37',
              filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6))'
            }} 
          />
        </div>

        {/* Envelope/Card icon */}
        <div className="welcome-title mb-4">
          <p 
            className="font-[family-name:var(--font-montserrat)] text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
            style={{ color: 'rgba(212, 175, 55, 0.8)' }}
          >
            Anda Menerima Kartu Natal
          </p>
          <h1 
            className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-6xl"
            style={{ color: '#D4AF37' }}
          >
            Merry Christmas
          </h1>
        </div>

        <p className="welcome-subtitle font-[family-name:var(--font-montserrat)] text-white/60 text-sm md:text-base mb-8">
          Dari Keluarga <span style={{ color: '#D4AF37' }}>{FAMILY_NAME}</span>
        </p>

        {/* Enter button */}
        <button
          onClick={handleEnter}
          className="welcome-btn group relative px-8 py-4 rounded-full font-[family-name:var(--font-montserrat)] text-sm md:text-base tracking-wider uppercase transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
            color: '#051014',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), 0 10px 40px rgba(0, 0, 0, 0.3)'
          }}
        >
          <span className="flex items-center gap-3">
            <FaMusic className="text-lg" />
            Buka Kartu
            <FaGift className="text-lg" />
          </span>
        </button>

        {/* <p className="welcome-subtitle mt-6 font-[family-name:var(--font-montserrat)] text-white/40 text-xs">
          🎵 Klik untuk membuka dengan musik
        </p> */}
      </div>
    </div>
  );
};

// ============================================
// MUSIC PLAYER COMPONENT
// ============================================
const MusicPlayer = ({ shouldPlay }: { shouldPlay: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          console.log('Play prevented');
        });
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Play when shouldPlay becomes true (only once)
  useEffect(() => {
    if (shouldPlay && audioRef.current && !hasStarted) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch((err) => {
        console.log('Play error:', err);
      });
    }
  }, [shouldPlay, hasStarted]);

  // Listen to audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/christmas-music.mp3"
        loop
        preload="auto"
        autoPlay
      />

      {/* Floating Music Button */}
      <div 
        className="fixed bottom-6 right-6 z-[150] flex items-center gap-2 transition-all duration-300"
      >
        {/* Music info pill */}
        <div 
          className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'rgba(5, 16, 20, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }}
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`w-1 bg-yellow-500 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                style={{
                  height: `${8 + bar * 4}px`,
                  animationDelay: `${bar * 0.1}s`
                }}
              />
            ))}
          </div>
          <span className="text-white/70 text-xs font-[family-name:var(--font-montserrat)]">
            Hark the Herald Angels Sing
          </span>
        </div>

        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          style={{
            background: isPlaying 
              ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(180, 140, 20, 0.9) 100%)'
              : 'rgba(5, 16, 20, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(212, 175, 55, 0.5)',
            boxShadow: isPlaying 
              ? '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <FaPause className="text-[#051014] text-lg" />
          ) : (
            <FaPlay className="text-yellow-500 text-lg ml-1" />
          )}
        </button>
      </div>

      {/* Music note floating animation when playing */}
      {isPlaying && (
        <div className="fixed bottom-24 right-10 z-[140] pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <FaMusic
              key={i}
              className="absolute text-yellow-500/30 animate-float"
              style={{
                fontSize: `${12 + i * 4}px`,
                right: `${i * 15}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

// ============================================
// SNOW EFFECT COMPONENT (Canvas-based)
// ============================================
const SnowEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();

    interface Snowflake {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      wind: number;
      swing: number;
      swingSpeed: number;
    }

    const snowflakes: Snowflake[] = [];
    const count = Math.min(150, Math.floor(width / 10));

    for (let i = 0; i < count; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        wind: Math.random() * 0.5 - 0.25,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      snowflakes.forEach((flake) => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        
        // Gradient for each snowflake
        const gradient = ctx.createRadialGradient(
          flake.x, flake.y, 0,
          flake.x, flake.y, flake.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${flake.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Update position
        flake.swing += flake.swingSpeed;
        flake.y += flake.speed;
        flake.x += flake.wind + Math.sin(flake.swing) * 0.5;

        // Reset when off screen
        if (flake.y > height) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }
        if (flake.x > width) flake.x = 0;
        if (flake.x < 0) flake.x = width;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100]" 
      aria-hidden="true"
    />
  );
};

// ============================================
// FLOATING ORNAMENTS COMPONENT
// ============================================
const FloatingOrnaments = () => {
  const ornaments = [
    { Icon: FaSnowflake, color: 'text-white/20', size: 'text-4xl', position: 'top-20 left-[10%]', delay: 0 },
    { Icon: FaStar, color: 'text-yellow-500/30', size: 'text-3xl', position: 'top-40 right-[15%]', delay: 0.5 },
    { Icon: FaGift, color: 'text-red-500/20', size: 'text-5xl', position: 'top-[60%] left-[5%]', delay: 1 },
    { Icon: FaTree, color: 'text-green-500/20', size: 'text-4xl', position: 'top-[30%] right-[8%]', delay: 1.5 },
    { Icon: FaBell, color: 'text-yellow-400/25', size: 'text-3xl', position: 'bottom-40 left-[12%]', delay: 2 },
    { Icon: FaCandyCane, color: 'text-red-400/20', size: 'text-4xl', position: 'bottom-60 right-[10%]', delay: 2.5 },
    { Icon: IoSparkles, color: 'text-yellow-300/30', size: 'text-2xl', position: 'top-[45%] left-[85%]', delay: 3 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {ornaments.map((item, index) => (
        <div
          key={index}
          className={`ornament absolute ${item.position} ${item.color} ${item.size} animate-float`}
          style={{ animationDelay: `${item.delay}s` }}
        >
          <item.Icon />
        </div>
      ))}
    </div>
  );
};

// ============================================
// LOADING SCREEN COMPONENT
// ============================================
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loadingRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete
        });
      }
    });

    tl.to(progressRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.inOut'
    })
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5
    }, '-=0.5');

  }, [onComplete]);

  return (
    <div 
      ref={loadingRef}
      className="fixed inset-0 z-[200] bg-[#051014] flex flex-col items-center justify-center"
    >
      <div className="relative mb-8">
        <FaStar className="text-6xl md:text-8xl text-yellow-500 animate-pulse glow-gold-strong" />
      </div>
      
      <div ref={textRef} className="text-center">
        <h2 className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-6xl text-yellow-500 mb-4">
          Merry Christmas
        </h2>
        <p className="text-white/60 text-sm tracking-[0.3em] uppercase">Loading...</p>
      </div>

      <div className="w-48 md:w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full w-0 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 rounded-full"
        />
      </div>
    </div>
  );
};

// ============================================
// HERO SECTION COMPONENT
// ============================================
const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stars
      gsap.from('.hero-star', {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.5
      });

      // Animate title letters
      gsap.from('.hero-title span', {
        y: 100,
        opacity: 0,
        rotationX: -90,
        stagger: 0.08,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 0.8
      });

      // Animate subtitle
      gsap.from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.8,
        ease: 'power3.out'
      });

      // Animate scroll indicator
      gsap.from('.scroll-indicator', {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 2.5,
        ease: 'power3.out'
      });

      // Parallax effect on scroll
      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleChars = "MERRY".split('');
  const titleChars2 = "CHRISTMAS".split('');

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="hero-bg absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1f26] via-[#051014] to-[#051014]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        {/* Stars decoration */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
          <FaStar className="hero-star text-2xl md:text-3xl text-yellow-500 glow-gold" />
          <div ref={subtitleRef} className="hero-subtitle">
            <span className="font-[family-name:var(--font-montserrat)] tracking-[0.4em] text-xs md:text-sm uppercase text-yellow-500/80">
              Season&apos;s Greetings {GREETING_YEAR}
            </span>
          </div>
          <FaStar className="hero-star text-2xl md:text-3xl text-yellow-500 glow-gold" />
        </div>

        {/* Main Title */}
        <h1 
          ref={titleRef}
          className="hero-title font-[family-name:var(--font-cinzel)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-none"
        >
          <div className="block mb-2 md:mb-4">
            {titleChars.map((char, i) => (
              <span 
                key={i} 
                className="inline-block"
                style={{ 
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.5))'
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="block">
            {titleChars2.map((char, i) => (
              <span 
                key={i} 
                className="inline-block text-white"
                style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.3)' }}
              >
                {char}
              </span>
            ))}
          </div>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-8 md:mt-12 font-[family-name:var(--font-montserrat)] text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
          Semoga damai dan sukacita menyertai Anda dan keluarga tercinta
          <br className="hidden md:block" />
          di musim yang penuh keajaiban ini
        </p>

        {/* Family name */}
        <div className="hero-subtitle mt-8">
          <span className="font-[family-name:var(--font-great-vibes)] text-3xl md:text-5xl text-yellow-500 glow-gold">
            From {FAMILY_NAME} Family
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

// ============================================
// MESSAGE SECTION COMPONENT
// ============================================
const MessageSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.message-decor', { scale: 1, opacity: 1 });
      gsap.set('.message-signature', { y: 0, opacity: 1 });

      // Split text animation
      if (textRef.current) {
        const split = new SplitType(textRef.current, { types: 'words,chars' });
        
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: 1,
          },
          opacity: 0.1,
          color: '#1a1a1a',
          stagger: 0.02,
        });
      }

      // Animate decorative elements
      gsap.from('.message-decor', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.15
      });

      // Animate signature
      gsap.from('.message-signature', {
        scrollTrigger: {
          trigger: '.message-signature',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 md:py-32 px-4 md:px-8 bg-[#051014]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Section header */}
        {/* <div className="flex items-center justify-center gap-4 mb-12 md:mb-16">
          <div className="message-decor w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-yellow-500/50" />
          <FaHeart className="message-decor text-xl md:text-2xl text-red-500/60" />
          <span className="message-decor font-[family-name:var(--font-montserrat)] text-yellow-500/80 text-xs md:text-sm tracking-[0.3em] uppercase">
            Pesan dari Hati
          </span>
          <FaHeart className="message-decor text-xl md:text-2xl text-red-500/60" />
          <div className="message-decor w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-yellow-500/50" />
        </div> */}

        {/* Main message */}
        <p 
          ref={textRef}
          className="font-[family-name:var(--font-cinzel)] text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-relaxed md:leading-relaxed text-white/90"
        >
          &ldquo;Natal bukan hanya tentang hari yang spesial, tetapi tentang hati yang penuh kasih. 
          Di tengah dinginnya musim, kehangatan keluarga adalah hadiah terindah yang tidak ternilai harganya. 
          Terima kasih telah menjadi bagian dari perjalanan hidup kami di tahun ini.&rdquo;
        </p>

        {/* Signature */}
        <div className="message-signature mt-16 md:mt-20 pt-8 md:pt-10 border-t border-white/10">
          <p className="font-[family-name:var(--font-montserrat)] text-white/60 text-sm md:text-base italic mb-3">
            Dengan penuh kasih & doa,
          </p>
          <p className="font-[family-name:var(--font-great-vibes)] text-4xl md:text-6xl text-yellow-500 glow-gold">
            Keluarga {FAMILY_NAME}
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// WISHES SECTION COMPONENT
// ============================================
const WishesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const wishes = [
    {
      icon: FaHeart,
      title: "Kasih & Cinta",
      description: "Semoga kasih dan cinta senantiasa memenuhi rumah tangga Anda sepanjang tahun.",
      color: "from-red-500/20 to-red-600/10",
      iconColor: "text-red-500"
    },
    {
      icon: IoSparkles,
      title: "Sukacita",
      description: "Semoga sukacita Natal terus bersinar dalam setiap langkah perjalanan hidup Anda.",
      color: "from-yellow-500/20 to-yellow-600/10",
      iconColor: "text-yellow-500"
    },
    {
      icon: FaStar,
      title: "Berkat Melimpah",
      description: "Semoga berkat Tuhan yang melimpah menyertai Anda dan keluarga di tahun yang baru.",
      color: "from-amber-500/20 to-amber-600/10",
      iconColor: "text-amber-500"
    },
    {
      icon: FaGift,
      title: "Kebahagiaan",
      description: "Semoga setiap hari dipenuhi dengan kebahagiaan dan kedamaian yang sempurna.",
      color: "from-green-500/20 to-green-600/10",
      iconColor: "text-green-500"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set('.wish-card', { y: 0, opacity: 1 });
      gsap.set('.wishes-title', { y: 0, opacity: 1 });

      // Animate cards on scroll
      gsap.from('.wish-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Animate section title
      gsap.from('.wishes-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #051014 0%, #0a1a20 50%, #051014 100%)' }}
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-red-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section title */}
        <div className="wishes-title text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-yellow-500/50" />
            <FaStar className="text-yellow-500 text-lg" />
            <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-5xl lg:text-6xl text-white mb-4">
            Doa & <span style={{ color: '#D4AF37' }}>Harapan</span> Kami
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-white/60 text-sm md:text-base max-w-2xl mx-auto">
            Kiranya doa dan harapan terbaik kami menyertai perjalanan hidup Anda
          </p>
        </div>

        {/* Wishes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {wishes.map((wish, index) => (
            <div 
              key={index}
              className="wish-card rounded-2xl p-6 md:p-8 text-center group transition-all duration-500 hover:-translate-y-2"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(212, 175, 55, 0.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div 
                className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500"
                style={{
                  background: `linear-gradient(135deg, ${wish.iconColor === 'text-red-500' ? 'rgba(239, 68, 68, 0.2)' : wish.iconColor === 'text-yellow-500' ? 'rgba(234, 179, 8, 0.2)' : wish.iconColor === 'text-amber-500' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(34, 197, 94, 0.2)'} 0%, transparent 100%)`,
                  border: `1px solid ${wish.iconColor === 'text-red-500' ? 'rgba(239, 68, 68, 0.3)' : wish.iconColor === 'text-yellow-500' ? 'rgba(234, 179, 8, 0.3)' : wish.iconColor === 'text-amber-500' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                }}
              >
                <wish.icon 
                  className="text-2xl md:text-3xl" 
                  style={{ 
                    color: wish.iconColor === 'text-red-500' ? '#ef4444' : wish.iconColor === 'text-yellow-500' ? '#eab308' : wish.iconColor === 'text-amber-500' ? '#f59e0b' : '#22c55e' 
                  }} 
                />
              </div>
              <h3 className="font-[family-name:var(--font-cinzel)] text-lg md:text-xl text-white mb-3">
                {wish.title}
              </h3>
              <p className="font-[family-name:var(--font-montserrat)] text-white/60 text-sm leading-relaxed">
                {wish.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// NEW YEAR SECTION COMPONENT
// ============================================
const NewYearSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to('.newyear-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Animate header
      gsap.from('.newyear-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate title
      gsap.from('.newyear-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out'
      });

      // Animate year number
      gsap.from('.year-number', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'back.out(1.7)'
      });

      // Animate description
      gsap.from('.newyear-desc', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out'
      });

      // Animate button
      gsap.from('.newyear-btn', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-20 md:py-32 px-4 overflow-hidden"
      style={{ background: 'linear-gradient(0deg, #051014 0%, #0a1f26 50%, #051014 100%)' }}
    >
      {/* Background */}
      <div className="newyear-bg absolute inset-0 z-0">
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.15) 0%, transparent 50%)' 
          }} 
        />
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(ellipse at bottom, rgba(139, 0, 0, 0.1) 0%, transparent 50%)' 
          }} 
        />
      </div>

      {/* Decorative elements */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
        style={{ 
          background: 'rgba(212, 175, 55, 0.1)',
          animation: 'pulse-glow 3s ease-in-out infinite'
        }} 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl"
        style={{ 
          background: 'rgba(139, 0, 0, 0.1)',
          animation: 'pulse-glow 3s ease-in-out infinite',
          animationDelay: '1.5s'
        }} 
      />
      
      {/* Stars decoration */}
      <div className="absolute top-20 left-10 text-yellow-500/20 text-2xl"><FaStar /></div>
      <div className="absolute top-40 right-20 text-yellow-500/15 text-xl"><FaStar /></div>
      <div className="absolute bottom-32 left-20 text-yellow-500/10 text-3xl"><FaStar /></div>
      <div className="absolute bottom-20 right-10 text-yellow-500/20 text-lg"><FaStar /></div>

      <div className="newyear-content relative z-10 text-center max-w-4xl mx-auto">
        <div className="newyear-header flex items-center justify-center gap-3 mb-6">
          <IoSparkles className="text-2xl" style={{ color: '#D4AF37' }} />
          <span 
            className="font-[family-name:var(--font-montserrat)] text-xs md:text-sm tracking-[0.3em] uppercase"
            style={{ color: 'rgba(212, 175, 55, 0.8)' }}
          >
            Menyambut Tahun Baru
          </span>
          <IoSparkles className="text-2xl" style={{ color: '#D4AF37' }} />
        </div>

        <h2 className="newyear-title font-[family-name:var(--font-cinzel)] text-4xl md:text-6xl lg:text-7xl text-white mb-4">
          Happy New Year
        </h2>

        <div className="year-number my-6 md:my-10">
          <span 
            className="font-[family-name:var(--font-cinzel)] text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold leading-none inline-block"
            style={{ 
              color: '#D4AF37',
              textShadow: '0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.4), 0 0 120px rgba(212, 175, 55, 0.2)',
              letterSpacing: '0.05em'
            }}
          >
            {NEW_YEAR}
          </span>
        </div>

        <p className="newyear-desc font-[family-name:var(--font-montserrat)] text-white/70 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
          Semoga tahun yang baru membawa berkat, kesuksesan, dan kebahagiaan 
          yang melimpah bagi Anda dan seluruh keluarga tercinta.
        </p>

        <div 
          className="newyear-btn inline-flex items-center gap-4 px-8 py-4 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <FaTree className="text-xl" style={{ color: '#22c55e' }} />
          <span className="font-[family-name:var(--font-montserrat)] text-white/80 text-sm md:text-base">
            Selamat merayakan dengan sukacita!
          </span>
          <FaTree className="text-xl" style={{ color: '#22c55e' }} />
        </div>
      </div>
    </section>
  );
};

// ============================================
// FAMILY PHOTO SECTION COMPONENT
// ============================================
const FamilyPhotoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate photo frame
      gsap.from('.photo-frame', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Animate title
      gsap.from('.photo-title', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate caption
      gsap.from('.photo-caption', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #051014 0%, #08181D 50%, #051014 100%)' }}
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
      
      {/* Floating decorations */}
      <div className="absolute top-20 left-10 text-yellow-500/10 text-3xl"><FaStar /></div>
      <div className="absolute bottom-20 right-10 text-yellow-500/10 text-2xl"><FaStar /></div>
      <div className="absolute top-1/2 right-5 text-white/5 text-4xl"><FaSnowflake /></div>
      <div className="absolute top-1/3 left-5 text-white/5 text-3xl"><FaSnowflake /></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section title */}
        <div className="photo-title text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 md:w-20 h-px bg-gradient-to-r from-transparent to-yellow-500/50" />
            <FaCamera className="text-yellow-500 text-lg" />
            <div className="w-12 md:w-20 h-px bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
          <h2 className="font-[family-name:var(--font-cinzel)] text-3xl md:text-5xl text-white mb-3">
            Keluarga <span style={{ color: '#D4AF37' }}>Kami</span>
          </h2>
          <p className="font-[family-name:var(--font-montserrat)] text-white/60 text-sm md:text-base">
            Bersama dalam kasih, bersatu dalam doa
          </p>
        </div>

        {/* Photo Frame */}
        <div className="photo-frame relative max-w-3xl mx-auto">
          {/* Decorative frame border */}
          <div 
            className="absolute -inset-3 md:-inset-4 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.1) 50%, rgba(212, 175, 55, 0.3) 100%)',
              filter: 'blur(1px)'
            }}
          />
          
          {/* Inner frame */}
          <div 
            className="relative rounded-xl overflow-hidden"
            style={{
              border: '2px solid rgba(212, 175, 55, 0.4)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(212, 175, 55, 0.1)'
            }}
          >
            {/* Photo container */}
            <div className="relative aspect-[4/3] md:aspect-[16/10] bg-[#0a1a20]">
              {/* Placeholder - ganti dengan foto keluarga */}
              <Image
                src="/family-photo.jpeg"
                alt={`Foto Keluarga ${FAMILY_NAME}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Photo caption bar */}
            <div 
              className="photo-caption relative px-6 py-4 md:px-8 md:py-5"
              style={{
                background: 'linear-gradient(180deg, rgba(5, 16, 20, 0.95) 0%, rgba(5, 16, 20, 1) 100%)'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-[family-name:var(--font-great-vibes)] text-2xl md:text-3xl text-yellow-500">
                    Keluarga {FAMILY_NAME}
                  </p>
                  <p className="font-[family-name:var(--font-montserrat)] text-white/50 text-xs md:text-sm mt-1">
                    Natal {GREETING_YEAR}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaHeart className="text-red-500 text-lg md:text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-yellow-500/50 rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-yellow-500/50 rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-500/50 rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-yellow-500/50 rounded-br-lg" />
        </div>

        {/* Bottom message */}
        <div className="photo-caption text-center mt-10 md:mt-12">
          <p className="font-[family-name:var(--font-montserrat)] text-white/50 text-sm italic">
            &ldquo;Keluarga adalah hadiah terindah dari Tuhan&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = () => {
  return (
    <footer className="relative py-12 md:py-16 bg-[#020506] overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Decorative star */}
        <div className="mb-8">
          <FaStar className="inline-block text-4xl text-yellow-500 glow-gold animate-pulse" />
        </div>

        {/* Family signature */}
        <p className="font-[family-name:var(--font-great-vibes)] text-3xl md:text-4xl text-yellow-500 mb-4">
          Keluarga {FAMILY_NAME}
        </p>

        <p className="font-[family-name:var(--font-montserrat)] text-white/50 text-xs md:text-sm tracking-[0.2em] uppercase mb-8">
          Natal {GREETING_YEAR} & Tahun Baru {NEW_YEAR}
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-white/20" />
          <FaSnowflake className="text-white/30 text-sm" />
          <div className="w-12 h-px bg-white/20" />
        </div>

        {/* Made with love */}
        {/* <p className="font-[family-name:var(--font-montserrat)] text-white/30 text-xs tracking-widest">
          DIBUAT DENGAN <FaHeart className="inline text-red-500 mx-1" /> UNTUK ANDA & KELUARGA
        </p> */}
      </div>
    </footer>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function ChristmasGreeting() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleWelcomeEnter = useCallback(() => {
    setShowWelcome(false);
    setIsLoading(true);
    setMusicStarted(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [isLoading]);

  return (
    <>
      {showWelcome && <WelcomeScreen onEnter={handleWelcomeEnter} />}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div 
        ref={containerRef}
        className={`relative min-h-screen bg-[#051014] text-white transition-opacity duration-500 ${(isLoading || showWelcome) ? 'opacity-0' : 'opacity-100'}`}
      >
        <SnowEffect />
        <FloatingOrnaments />
        <MusicPlayer shouldPlay={musicStarted} />
        
        <main>
          <HeroSection />
          <MessageSection />
          <FamilyPhotoSection />
          <WishesSection />
          <NewYearSection />
        </main>

        <Footer />
      </div>
    </>
  );
}