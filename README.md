# <a href='https://blobs.xom9ik.com'><img src='https://github.com/xom9ikk/animated-blobs/raw/master/public/icons/icon-512x512.png' height='60' alt='Blobs Logo' aria-label='blobs.xom9ik.com' /></a> Animated blobs generator

# For users 😀
**Blob animation** is a tool for generating **animated** blobs.
With it, you can generate absolutely any blob animation.
This tool also supports **gradients**.

## 🪵 What can be generated?
You can generate:
- **one animated** blob;
- **several animated** blobs that you can overlay on top of each other in the future (GIF does not support *translucency*, so there is such a limitation);
- non-animated **SVG blob**;
- for all of the above, you can use a **gradient**;

## 🚀 How to use?
Using the toolbar, you can change the **complexity** of the generated blob. 
You can change the **number of points**, blob **color** and **gradients**!
To generate a new blob with the previously specified parameters, press **dice button**.
And when you find a suitable blob form for you, save it by clicking on the **download button**.

## 📦 Where can these animations be used?
They can be used on websites, in mobile applications, etc. 
For me personally, they came in handy for creating blob animations in one of my [React Native](https://reactnative.dev/) applications.
Because generating and animating such blobs in real time takes quite a lot of resources, which cannot be said about GIF animation.
After generation, I just overlaid these blobs and made them transparent, and after that I got this result.

## ✨ Words of gratitude
Special thanks for the library for generating blobs, I want to say [@g-harel](https://github.com/g-harel/blobs) 🔥

Thanks for porting the library for creating GIF animations [@antimatter15](https://github.com/antimatter15/jsgif) 💪

And thanks for the inspiration to [blobmaker.app](https://www.blobmaker.app/) 💡

I hope this will be useful to someone. For all contacts with me, use either github [@xom9ikk](https://github.com/xom9ikk) or telegram [@xom9ik](https://t.me/xom9ik).

# For developers 🤔

## Installation and Development server

Clone repo
```bash
$ git clone https://github.com/xom9ikk/animated-blobs.git
```

Install the dependencies
```bash
$ npm i
```

Run in `dev` mode with hot reload. `dev` server will run at `http://localhost:3000`
```bash
$ npm run dev
```

Build for `production` and run server. `production` server will run at `http://localhost:3000`
```bash
$ npm run build
$ npm start
```

## License

[MIT](LICENSE.md)
