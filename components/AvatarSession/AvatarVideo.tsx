import React, { forwardRef } from "react";
import { ConnectionQuality } from "@heygen/streaming-avatar";

import { useConnectionQuality } from "../logic/useConnectionQuality";
import { useStreamingAvatarSession } from "../logic/useStreamingAvatarSession";
import { StreamingAvatarSessionState } from "../logic";
import { CloseIcon } from "../Icons";
import { Button } from "../Button";

export const AvatarVideo = forwardRef<HTMLVideoElement>(({}, ref) => {
  const { sessionState, stopAvatar } = useStreamingAvatarSession();
  const { connectionQuality } = useConnectionQuality();

  const isLoaded = sessionState === StreamingAvatarSessionState.CONNECTED;

  return (
    <>
      {connectionQuality !== ConnectionQuality.UNKNOWN && (
        <div className="absolute top-3 left-3 bg-black text-white rounded-lg px-3 py-2">
          Connection Quality: {connectionQuality}
        </div>
      )}
      {isLoaded && (
        <Button
          className="absolute top-3 right-3 !p-2 bg-gray-800 bg-opacity-50 z-10"
          onClick={stopAvatar}
        >
          <CloseIcon />
        </Button>
      )}
      <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
        <video
          ref={ref}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
          style={{
            objectFit: "cover",
          }}
        >
          <track kind="captions" />
        </video>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-lg font-medium">Loading...</div>
          </div>
        )}
      </div>
    </>
  );
});
AvatarVideo.displayName = "AvatarVideo";
