interface VideoInfo {
  platform: 'youtube' | 'vimeo' | 'dailymotion' | 'embed';
  videoId: string;
}

export function extractVideoInfo(url: string): VideoInfo | null {
  try {
    let urlObj: URL;
    
    // Handle iframe src URLs
    if (url.includes('iframe') || url.includes('embed')) {
      // Extract URL from iframe src if present
      const srcMatch = url.match(/src=["'](.*?)["']/);
      if (srcMatch) {
        url = srcMatch[1];
      }
    }

    // Try to create URL object
    try {
      urlObj = new URL(url);
    } catch {
      // If URL is invalid, try prepending https://
      urlObj = new URL(`https://${url}`);
    }
    
    // YouTube
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      let videoId;
      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else if (urlObj.pathname.includes('embed')) {
        videoId = urlObj.pathname.split('/').pop();
      } else {
        videoId = urlObj.searchParams.get('v');
      }
      if (videoId) {
        return { platform: 'youtube', videoId };
      }
    }
    
    // Vimeo
    if (urlObj.hostname.includes('vimeo.com')) {
      const pathParts = urlObj.pathname.split('/');
      const videoId = pathParts[pathParts.length - 1];
      if (videoId && videoId.length > 0) {
        return { platform: 'vimeo', videoId };
      }
    }
    
    // Dailymotion
    if (urlObj.hostname.includes('dailymotion.com')) {
      let videoId = urlObj.pathname.split('/video/')[1];
      if (!videoId) {
        const pathParts = urlObj.pathname.split('/');
        videoId = pathParts[pathParts.length - 1];
      }
      if (videoId && videoId.length > 0) {
        const cleanVideoId = videoId.split('?')[0];
        return { platform: 'dailymotion', videoId: cleanVideoId };
      }
    }

    // Generic embed URLs
    if (url.includes('iframe') || url.includes('embed') || url.endsWith('.mp4')) {
      return {
        platform: 'embed',
        videoId: url // For embed URLs, we store the full URL as the videoId
      };
    }
  } catch (error) {
    // If all parsing fails, but URL ends with video extension or contains embed/iframe
    if (url.includes('iframe') || url.includes('embed') || url.endsWith('.mp4')) {
      return {
        platform: 'embed',
        videoId: url
      };
    }
    return null;
  }
  
  return null;
}

export function getThumbnailUrl(platform: string, videoId: string): string {
  switch (platform) {
    case 'youtube':
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    case 'vimeo':
      // Vimeo requires an API call for thumbnails, using placeholder
      return `https://placehold.co/640x360/333/fff?text=Vimeo+Video`;
    case 'dailymotion':
      return `https://www.dailymotion.com/thumbnail/video/${videoId}`;
    case 'embed':
      return `https://placehold.co/640x360/333/fff?text=Video+Player`;
    default:
      return `https://placehold.co/640x360/333/fff?text=Video`;
  }
}