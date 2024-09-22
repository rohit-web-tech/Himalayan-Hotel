import React from "react";
import { RiStarSFill } from "react-icons/ri";
import moment from 'moment';
import Loader from "../../components/loader";

const BookRoom = ({ setShowBookRoom , roomDetails , dates , handleBookRoom ,roomId, loading}) => {
    const fromDate = dates.fromDate , toDate = dates.toDate ;
    const fromdate = moment(fromDate, 'DD-MMM-YYYY');
    const todate = moment(toDate, 'DD-MMM-YYYY');
    const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1;
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
                onClick={()=>{setShowBookRoom(false)}}
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
              <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img
                    src={roomDetails?.imageUrl}
                    alt={roomDetails?.roomName}
                    class="object-cover object-center"
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
                  <section aria-labelledby="information-heading" class="mt-2 gap-1 flex flex-col mb-1">
                    <p class="text-[16px] text-gray-900">{roomDetails?.rent}rs/Night</p>
                    <p class="text-[16px] text-gray-900">From : {fromDate}</p>
                    <p class="text-[16px] text-gray-900">To : {toDate}</p>
                  </section>

                  <h2 className="text-left font-semibold text-[16px] text-black mb-1">Total Days : {totalDays}</h2>
                  <h2 className="text-left font-semibold text-[16px] text-black">Total Rent : {totalDays*roomDetails?.rent}rs</h2>

                  <section aria-labelledby="options-heading" class="mt-10">
                    <button
                      onClick={()=>handleBookRoom(roomId)}
                      type="submit"
                      class={`mt-6 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 ${!loading ? "bg-[--primary-color]" : "bg-slate-300" }`}
                    >
                      {loading ? <Loader className="h-4 w-4"/> : "Book Now !"}
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

export default BookRoom;
