import React from "react";

function Cards({ item, onViewDetails }) {
  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border h-full flex flex-col">
          <figure className="h-64 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body flex-grow">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{item.title}</p>
            
            {/* Author and Rating */}
            <div className="flex items-center gap-2 text-sm mt-2">
              <span className="text-slate-600 dark:text-slate-400">🖊️ {item.author}</span>
              <span className="ml-auto text-yellow-500">★ {item.rating}</span>
            </div>
            
            <div className="card-actions justify-between items-center mt-4">
              <div className="text-xl font-bold text-pink-500">
                {item.price === 0 ? "FREE" : `$${item.price}`}
              </div>
              <div className="flex gap-2">
                {onViewDetails && (
                  <button 
                    onClick={() => onViewDetails(item)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Details
                  </button>
                )}
                <button className="btn btn-sm bg-pink-500 text-white border-none hover:bg-pink-600">
                  {item.price === 0 ? "Read Now" : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
