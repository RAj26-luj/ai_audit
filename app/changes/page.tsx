export default function ChangesPage(){

  const changes = [

    {
      tool:"Cursor Business",
      oldPrice:40,
      newPrice:45,
    },

    {
      tool:"GitHub Copilot Enterprise",
      oldPrice:39,
      newPrice:49,
    },

    {
      tool:"Claude Team",
      oldPrice:30,
      newPrice:35,
    },
  ];

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      px-6
      py-14
    ">

      <div className="
        max-w-4xl
        mx-auto
      ">

        <div className="mb-12">

          <div className="
            inline-flex
            px-4
            py-2
            rounded-full
            bg-indigo-500/10
            text-indigo-300
            text-sm
            font-semibold
          ">
            AI Pricing Changes
          </div>

          <h1 className="
            text-5xl
            font-black
            mt-6
          ">
            AI Tool Pricing Updates
          </h1>

          <p className="
            text-gray-400
            mt-4
            text-lg
          ">
            Recent pricing changes detected across supported AI tools.
          </p>

        </div>

        <div className="
          grid
          gap-5
        ">

          {changes.map(
            (change,index)=>(
              <div
                key={index}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-4
                ">

                  <div>

                    <h2 className="
                      text-2xl
                      font-bold
                    ">
                      {change.tool}
                    </h2>

                    <p className="
                      text-gray-500
                      mt-2
                    ">
                      Pricing updated this week
                    </p>

                  </div>

                  <div className="
                    text-right
                  ">

                    <div className="
                      text-gray-500
                      line-through
                      text-lg
                    ">
                      ${change.oldPrice}
                    </div>

                    <div className="
                      text-3xl
                      font-black
                      text-green-400
                    ">
                      ${change.newPrice}
                    </div>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}