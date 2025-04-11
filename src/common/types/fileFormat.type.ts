export const FileAudio = ['wav', 'mp3', 'm4a', 'flac'] as const;
export const FileVideo = ['mp4', 'mkv', 'webm'] as const;
export const FileAll = [...FileAudio, ...FileVideo] as const;

export type FileFormat = (typeof FileAll)[number];
export type FileFormatAudio = (typeof FileAudio)[number];
export type FileFormatVideo = (typeof FileVideo)[number];
