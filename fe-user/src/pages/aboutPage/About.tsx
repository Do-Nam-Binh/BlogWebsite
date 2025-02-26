const About = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 m-10">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center">
          Do Nam Binh
        </h1>

        <div className="mt-2 flex space-x-4 self-center">
          <a
            href="#"
            className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
          >
            🔗 GitHub
          </a>
          <a
            href="#"
            className="text-blue-600 font-semibold hover:underline hover:text-blue-800"
          >
            🔗 LinkedIn
          </a>
        </div>

        <p className="mt-4 text-lg text-gray-600 text-center">
          Hey there! 👋 Welcome to{" "}
          <span className="font-semibold">Simply Bloggin</span>, a little corner
          of the internet where I ramble about the things I love—tech, video
          games, TV/animated shows, and Japanese culture.
        </p>

        <div className="mt-8 space-y-6">
          {/* Why This Blog? */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">Why This Blog?</h2>
            <p className="mt-2 text-gray-600">
              I started this blog as a way to{" "}
              <span className="font-semibold">practice the skills </span>
              I’ve learned in university,{" "}
              <span className="font-semibold">push my limits</span> as a
              developer, and most importantly,{" "}
              <span className="font-semibold">build the discipline</span> to see
              projects through to completion. It’s easy to start things, but
              finishing them? That’s the real challenge.
            </p>
          </section>

          {/* What's With the Name? */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">
              What’s With the Name?
            </h2>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Simply Bloggin</span> is a play on
              <span className="italic"> “Simply Bragging.”</span> But instead of
              flexing achievements, this blog is all about sharing my{" "}
              <span className="font-semibold">personal interests</span>—no ego,
              just vibes.
            </p>
          </section>

          {/* My Dev Journey */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800">My Dev Journey</h2>
            <p className="mt-2 text-gray-600">
              Aside from blogging about what I love, I’ll also be documenting my
              <span className="font-semibold">
                {" "}
                fullstack development journey
              </span>
              , from improving my skills to (hopefully) landing a job. If you're
              into tech, coding, and the ups and downs of being a developer, you
              might find something useful here.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
