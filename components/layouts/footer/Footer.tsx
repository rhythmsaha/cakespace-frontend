/* eslint-disable @next/next/no-img-element */
const Footer = () => {
  return (
    <footer className="xl:px-20 lg:px-12 sm:px-6 px-4 py-12 bg-gray-50 h-60">
      <div className="flex flex-col items-center justify-center">
        <div>
          <img src="/assets/transparentlogo.png" alt="logo" className="object-contain w-32" />
        </div>

        <div className="flex items-center gap-x-4 mt-6">
          <a href="https://twitter.com/_rhythmsaha" target="_blank" rel="noreferrer">
            <img src="/assets/twitter-circled.png" alt="" className="w-10 object-contain h-10" />
          </a>

          <a href="https://www.linkedin.com/in/rhythmsaha/" target="_blank" rel="noreferrer">
            <img src="/assets/linkedin-circled.png" alt="" className="w-10 object-contain h-10" />
          </a>

          <a href="https://github.com/rhythmsaha" target="_blank" rel="noreferrer">
            <img src="/assets/github.svg" alt="" className="w-10 object-contain h-10" />
          </a>
        </div>

        <div className="flex items-center mt-6">
          <p className="text-base leading-4 text-gray-800">
            2022 <span className="font-semibold">Cakespace</span>
          </p>
          <div className="border-l border-gray-800 pl-2 ml-2">
            <p className="text-base leading-4 text-gray-800">
              Built by{" "}
              <span>
                <a
                  href="https://rhythmsaha.me"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-gray-800"
                >
                  Rhythm Saha
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
