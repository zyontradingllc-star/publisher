import fs from "fs";
import path from "path";
import sharp from "sharp";

const dir = "public/publish-tips";
fs.mkdirSync(dir, { recursive: true });

/** Images from ChatGPT share (AuthorsPilot social / publish tips). */
const images = [
  [
    "1",
    "https://images.openai.com/static-rsc-4/UX71K2q7B9TfZPc9WcdQPZB92HOdbD9XhjVqfFZU3o6SvalliZm3yGG2FvfAf0v8NLJGFJK6SsZWdxuCeaoh8cBaV_3YjXFQx7fcTlZ6TdOqCEqueGTTh5RTWEIE_Jwi_rdHSo3XaEPtxldN-viTrcZTbnkoAF5foCltEkt1Y9M?purpose=inline",
  ],
  [
    "2",
    "https://images.openai.com/static-rsc-4/C7HbLwHanSXm9HH1OTzDJ8rvbJJMglFfkNhomTlXc3rFWZxjbumf4GX-PW9rO5Nik6zeCahBrhS9bgVP-MsI0Qewrdmud8Z9ntrsFBZ6pMaIEy4lPrcutxJyyHkq882HOtZ_72hp7SUVkowUPfjUL7k_3zApIpdI03-uUjzrGjg?purpose=inline",
  ],
  [
    "3",
    "https://images.openai.com/static-rsc-4/6N48WlhbWXp57zukpHt0dHRgAlcIe0a-pHSmfvxsfK8PHUFd6DqNR6gvOuSyq0JBmx3auynQLqHhEoLyl7F-SCplQu0FHCkt0nsfHLMOFg5Ro3_qxqZZk5VB8QvH4GyiEQzFhFHreI0joKKVBc-DPnp7nYZc9r35wNs6Otdqsdw?purpose=inline",
  ],
  [
    "4",
    "https://images.openai.com/static-rsc-4/5rkRK5jZR5sTydcYzpnXNJMwtjd6h8toLbKu-Y7P-UjQdZKGrDUKMzZYewXhiywyOGwlz967JafCARS6Akpeu3fA1g-Dxvi11NVoBmyWaCJxt2JqEB0IzxUtFTxjfXdbAItrh054UV0N9vWry0feyNCRoTsuhQq1G6ZWsGyN92U?purpose=inline",
  ],
  [
    "5",
    "https://images.openai.com/static-rsc-4/wsZteiIQFq1t_yVnkd5eZXFNlSbt57akJIBGtUFzS0OYuzHcD1My5bst2McfgzE6nASe-9zdVaPV6C6YpLXZ4H-lEizcMFWT8EZabnJmuy5XEK8vADevn6MpE3gzlyqEMgMp3xtTtVZ61StftNgXrJEH4QQknj9pgzg7iQk5_lw?purpose=inline",
  ],
  [
    "6",
    "https://images.openai.com/static-rsc-4/ijoXq98GAXoX7FeiBoRStL6iyqxqJXdkCGdic2WyPu_DEyK8Hn_GwYSNS6tLgsz8oTU_dc0nrpGXG5QxLRj-eO54Fw0DTpMddvEnn3wkdrZIT2bLp-0n3tcmSqvYv37C04K5c1Jr-1GmTooVeMx_HeGqFLgomQ7fzyHoac0cB-Y?purpose=inline",
  ],
  [
    "7",
    "https://images.openai.com/static-rsc-4/J2hGJjcWIBKBqK-GhyRP6HlRNEyYrMWYT2qWZ48wIg_Xl-mLbMKKMOGBO1Eex9bQccNRH3yQcb5iXk9RZtOXlULTMWCWdjTfqB6yTZcmmtFFRVFoYU0ncBSN1Q3PkryyQKDs-IyQqNE0lStrk3SEb8-4f6J5Cmp5fkj8MUTz1BU?purpose=inline",
  ],
  [
    "8",
    "https://images.openai.com/static-rsc-4/FkdF4ZVaCnkeOt_9zerZvfa_Rs3lv6XbWtDXLWlNUWpkqYWivlAamqx3lUxq0fMOfeffqC_MS4DcWZugTpI0zYLik0s5gHCLcrwp-OJQfbKhC4gy-z1G2LyqTvqqRDYmW9s6M77hsxVnotvkvdyyKHWyTvz4UIkH2pYUVjYJ34s?purpose=inline",
  ],
  [
    "9",
    "https://images.openai.com/static-rsc-4/xmZ6yOVIZOMXHwT8I9FQIUNrC2bPdhKRt-xYqoL1WmNu4LR9ZkrnJ7S2GbBXQyZI8Cui8hQF96ZDhvqI_k_dKw-EyD8ByLLzIvbog4MNnWf9nIpE1HwzPGKxGTDzQ_3YDiFFlux7MKtLrPQNUfMUQKic1f18EfDGsH_kKJRxMYM?purpose=inline",
  ],
];

for (const [id, url] of images) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0", Accept: "image/*" },
      redirect: "follow",
    });
    if (!res.ok) throw new Error(String(res.status));
    const buf = Buffer.from(await res.arrayBuffer());
    const out = path.join(dir, `${id}.webp`);
    await sharp(buf)
      .resize(640, 360, { fit: "cover", position: "centre" })
      .webp({ quality: 82 })
      .toFile(out);
    console.log("OK", id, fs.statSync(out).size);
  } catch (e) {
    console.log("FAIL", id, e.message);
  }
}
