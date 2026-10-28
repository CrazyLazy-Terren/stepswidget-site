// Kept out of duo-shots.tsx: that file is a client module, and the blog page
// checks these names while rendering on the server.
export const DUO_SHOTS_NAMES = ['folded', 'open', 'sheets', 'space'] as const

export type DuoShotsName = (typeof DUO_SHOTS_NAMES)[number]

export function isDuoShotsName(name: string): name is DuoShotsName {
  return (DUO_SHOTS_NAMES as readonly string[]).includes(name)
}
