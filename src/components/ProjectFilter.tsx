import React, { useState } from 'react';

interface ProjectData {
  title: string;
  description: string;
  price: string;
  status: 'Under Construction' | 'Delivered';
  type: 'Residential' | 'Commercial';
  rooms?: string;
  area?: string;
  location: string;
  image?: string;
}

interface Project {
  id: string;
  data: ProjectData;
}

interface Props {
  initialProjects: Project[];
}

export default function ProjectFilter({ initialProjects }: Props) {
  const [typeFilter, setTypeFilter] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Under Construction' | 'Delivered'>('All');

  // Filter projects based on state
  const filteredProjects = initialProjects.filter((project) => {
    const typeMatch = typeFilter === 'All' || project.data.type === typeFilter;
    const statusMatch = statusFilter === 'All' || project.data.status === statusFilter;
    return typeMatch && statusMatch;
  });

  return (
    <div className="space-y-12">
      
      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-charcoal/10 pb-6">
        
        {/* Type Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/40 mr-2">Category:</span>
          {(['All', 'Residential', 'Commercial'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-sm border transition-all duration-300 ${
                typeFilter === type
                  ? 'bg-charcoal text-linen border-charcoal'
                  : 'bg-transparent text-charcoal/70 border-charcoal/10 hover:border-charcoal hover:text-charcoal'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal/40 mr-2">Status:</span>
          {(['All', 'Under Construction', 'Delivered'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-sm border transition-all duration-300 ${
                statusFilter === status
                  ? 'bg-charcoal text-linen border-charcoal'
                  : 'bg-transparent text-charcoal/70 border-charcoal/10 hover:border-charcoal hover:text-charcoal'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Grid displaying filtered results */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-charcoal/10 rounded-sm">
          <p className="text-sm text-charcoal/50 uppercase tracking-wider">No projects match the selected criteria.</p>
          <button 
            onClick={() => { setTypeFilter('All'); setStatusFilter('All'); }} 
            className="mt-4 text-xs font-bold tracking-widest text-accent-gold uppercase hover:text-charcoal transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            // Determine placeholder image based on name
            let imgUrl = "/images/projects/sun-residency.jpg";
            if (project.data.title === "City Executive Tower") {
              imgUrl = "/images/projects/city-executive.jpg";
            } else if (project.data.title === "City Towers & Shopping Mall") {
              imgUrl = "/images/projects/city-towers.jpg";
            } else if (project.data.title === "Afroz Mobile Mall and Residency") {
              imgUrl = "/images/projects/afroz-residency.jpg";
            } else if (project.data.title === "Zain Shopping Mall") {
              imgUrl = "/images/projects/banner-2.jpg";
            } else if (project.data.title === "City Centre Shopping Mall") {
              imgUrl = "/images/projects/banner-4.jpg";
            } else if (project.data.title === "The Corner Apartment") {
              imgUrl = "/images/projects/banner-5.jpg";
            } else if (project.data.title === "Capital Center") {
              imgUrl = "/images/projects/banner-6.jpg";
            }

            return (
              <div key={project.id} className="flex flex-col space-y-4 group">
                
                {/* Image Cover */}
                {/* TODO: replace with client-provided photography */}
                <div className="relative aspect-[4/3] overflow-hidden bg-charcoal rounded-sm border border-charcoal/5 shadow-md">
                  <img
                    src={imgUrl}
                    alt={project.data.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-md text-linen px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase border border-linen/10 rounded-sm">
                    {project.data.status}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold tracking-widest text-accent-gold uppercase">{project.data.type}</span>
                    <h3 className="text-xl font-light font-display text-charcoal leading-snug group-hover:text-accent-gold transition-colors">
                      <a href={`/projects/${project.id}`}>{project.data.title}</a>
                    </h3>
                    <p className="text-[11px] text-charcoal/50 flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3 h-3 text-accent-gold flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span className="truncate">{project.data.location}</span>
                    </p>
                  </div>
                  
                  <div className="pt-2 flex items-center justify-between border-t border-charcoal/5 mt-4">
                    <div className="text-left">
                      <span className="text-[8px] font-bold text-charcoal/40 uppercase tracking-widest block">Price Model</span>
                      <span className="text-xs font-semibold text-charcoal/80">{project.data.price}</span>
                    </div>
                    <a
                      href={`/projects/${project.id}`}
                      className="text-[10px] font-bold tracking-wider uppercase text-accent-gold hover:text-charcoal transition-colors"
                    >
                      View Details &rarr;
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
