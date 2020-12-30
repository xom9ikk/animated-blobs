import { FC } from 'react';

export const Info: FC<{}> = () => (
  <section className="info">
    <div className="info__inner">
      <p className="info__text info__text--main">
        <b>Blob Animation</b>
        {' '}
        is a tool for generating
        {' '}
        <b>animated</b>
        {' '}
        blobs.
        With it, you can generate absolutely any blob animation.
        This tool also supports
        {' '}
        <b>gradients</b>
        . The source code of this tool is published on
        {' '}
        <a href="https://github.com/xom9ikk/animated-blobs">github</a>
      </p>
      <h2>🪵 What can be generated?</h2>
      <p className="info__text">
        You can generate:
        {' '}
        <b>one animated</b>
        {' '}
        blob;
        {' '}
        <b>several animated</b>
        {' '}
        blobs that you can overlay on top of each other in the future
        (GIF does not support
        {' '}
        <i>translucency</i>
        , so there is such a limitation);
        non-animated
        {' '}
        <b>SVG blob</b>
        ;
        And for all of the above, you can use a
        {' '}
        <b>gradient</b>
        .
      </p>
      <h2>
        🚀 How to use?
      </h2>
      <p className="info__text">
        Using the toolbar, you can change the
        {' '}
        <b>complexity</b>
        {' '}
        of the generated blob.
        You can change the
        {' '}
        <b>number of points</b>
        , blob
        {' '}
        <b>color</b>
        {' '}
        and
        {' '}
        <b>gradients</b>
        !
        To generate a new blob with the previously specified parameters, press
        {' '}
        <b>dice button</b>
        .
        And when you find a suitable blob form for you, save it by clicking on the
        {' '}
        <b>download button</b>
        .
      </p>
      <h2>
        📦 Where can these animations be used?
      </h2>
      <p className="info__text">
        They can be used on websites, in mobile applications, etc.
        For me personally, they came in handy for creating blob animations
        in one of my
        {' '}
        <a href="https://reactnative.dev/">React Native</a>
        {' '}
        applications.
        Because generating and animating such blobs in real time takes quite a lot of resources,
        which cannot be said about GIF animation.
        After generation, I just overlaid these blobs and made them transparent,
        and after that I got this result.
      </p>
      <h2>✨ Words of gratitude</h2>
      <p className="info__text">
        Special thanks for the library for generating blobs, I want to say
        {' '}
        <a href="https://github.com/g-harel/blobs">@g-harel </a>
        🔥
      </p>
      <p className="info__text">
        Thanks for porting the library for creating GIF animations
        {' '}
        <a href="https://github.com/antimatter15/jsgif">@antimatter15</a>
        💪
      </p>
      <p className="info__text">
        And thanks for the inspiration to
        {' '}
        <a href="https://www.blobmaker.app/">blobmaker.app</a>
        💡
      </p>
      <p className="info__text">
        I hope this will be useful to someone. For all contacts with me, use either github
        {' '}
        <a href="https://github.com/xom9ikk">@xom9ikk</a>
        {' '}
        or telegram
        {' '}
        <a href="https://t.me/xom9ik">@xom9ik</a>
        .
      </p>
    </div>
  </section>
);
