import { useCallback, useEffect, useRef, useState } from 'react';

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  unMute: () => void;
  setVolume: (v: number) => void;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
  el: HTMLElement,
  opts: {
    videoId: string;
    width: number;
    height: number;
    playerVars: Record<string, string | number>;
    events: {
      onReady?: () => void;
      onStateChange?: (e: {data: number;}) => void;
      onError?: (e: {data: number;}) => void;
    };
  })
  => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function useYouTubeAudio(videoId: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadYouTubeApi().then((YT) => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        width: 200,
        height: 200,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            playerRef.current?.setVolume(80);
            if (pendingPlayRef.current) {
              playerRef.current?.unMute();
              playerRef.current?.playVideo();
            }
          },
          onStateChange: (e) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (e.data === 1) setPlaying(true);
            if (e.data === 2) setPlaying(false);
            if (e.data === 0) playerRef.current?.playVideo();
          },
          onError: () => {
            setError(true);
            setPlaying(false);
          }
        }
      });
    });
    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  // Must be called directly inside a user tap/click so mobile browsers allow sound.
  const play = useCallback(() => {
    pendingPlayRef.current = true;
    if (readyRef.current && playerRef.current) {
      playerRef.current.unMute();
      playerRef.current.playVideo();
    }
  }, []);

  const pause = useCallback(() => {
    pendingPlayRef.current = false;
    playerRef.current?.pauseVideo();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();else
    play();
  }, [playing, play, pause]);

  return { containerRef, playing, error, play, pause, toggle };
}