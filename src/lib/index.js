// place files you want to import through the `$lib` alias in this folder.

export let testBlogs = [
{
  "_id": {
    "$oid": "661c3ecc3ca7652f24fca8eb"
  },
  "username": "Barney",
  "title": "Barney's Forum Post",
  "entry": "I think Mount Everest is a great place.",
  "likes": 0,
  "replies": [
    {
      "username": "adam",
      "entry": "Why do you say that?",
      "replies": [
        {
          "username": "adam",
          "entry": "Because it is there.",
          "replies": [{
            "username": "adam",
            "entry": "Oh.  Good reason.",
            "replies": [],
          }
        ],
        },
        {
          "username": "adam",
          "entry": "The air is a little thin though.",
          "replies": [],
        }
      ],
    }
  ],
  "__v": 0
},
{
  "_id": {
    "$oid": "64cd82c014c540513ca3629e"
  },
  "username": "Wilma",
  "title": "'Blog' from Wilma",
  "entry": "Blog entry...",
  "replies": [
    {
      "_id": {
        "$oid": "123"
      },
      "username": "Andy",
      "entry": "And?",
      "replies": [],
      "date": "Sun Apr 14 2024 19:13:32 GMT+0000 (Coordinated Universal Time)"
    }
  ],
  "__v": 0,
  "likes": 0
},
{
  "_id": {
    "$oid": "662ea78414d1f572a95dda0f"
  },
  "username": "adam",
  "title": "Try Svelte 5",
  "entry": "This uses Svelte 5",
  "likes": 0,
  "replies": [],
  "__v": 0
}]