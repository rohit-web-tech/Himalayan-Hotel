import React from "react";
import { RiStarSFill } from "react-icons/ri";

const RoomDetails = ({ setShowDetails , roomDetails , handleBook , roomId}) => {
  return (
    <div class="relative z-50" role="dialog" aria-modal="true">
      <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <div class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
            <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                onClick={()=>{setShowDetails(false)}}
              >
                <span class="sr-only">Close</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div class="grid w-full grid-cols-1 items-center gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img
                    src={roomDetails?.imageUrl}
                    alt={roomDetails?.roomName}
                    class="object-cover object-center w-full"
                  />
                </div>
                <div class="sm:col-span-8 lg:col-span-7">
                  <h2 class="text-2xl font-[600] text-gray-900 sm:pr-12">
                    {roomDetails?.roomName}
                  </h2>
                      <div class="flex items-center">
                        <div class="flex items-center">
                          <div className="stars text-[25px] text-[gold] flex items-center">
                            <RiStarSFill />
                            <RiStarSFill />
                            <RiStarSFill />
                            <RiStarSFill />
                            <RiStarSFill />
                          </div>
                        </div>
                    </div>
                  <section aria-labelledby="information-heading" class="mt-2">
                    <p class="text-[16px] text-gray-900">{roomDetails?.rent}rs/Night</p>
                    <p class="text-[16px] text-gray-900">Available Rooms : {roomDetails?.totalRooms}</p>
                  </section>

                  <section aria-labelledby="options-heading" class="mt-10">
                    <button
                      onClick={()=>{handleBook(roomId)}}
                      type="submit"
                      class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-[--primary-color] px-8 py-3 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2"
                    >
                      Book Room
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
