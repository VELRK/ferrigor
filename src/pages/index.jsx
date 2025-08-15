import React from "react";
import Layouts from "@layouts/Layouts";
import dynamic from "next/dynamic";

import { getSortedPostsData } from "@lib/posts";
import { getSortedProjectsData } from "@lib/projects";

import AboutSection from "@components/sections/About";
import ServicesSection from "@components/sections/Services";
import CountersSection from "@components/sections/Counters";
import FeaturesSection from "@components/sections/Features";
import RenovationSection from "@components/sections/Renovation";
import LatestPostsSection from "@components/sections/LatestPosts";

const HeroSlider = dynamic( () => import("@components/sliders/Hero"), { ssr: false } );
const PartnersSlider = dynamic( () => import("@components/sliders/Partners"), { ssr: false } );
const TestimonialSlider = dynamic( () => import("@components/sliders/Testimonial"), { ssr: false } );
const ProjectsSlider = dynamic( () => import("@components/sliders/Projects"), { ssr: false } );
const TeamSlider = dynamic( () => import("@components/sliders/Team"), { ssr: false } );

const Home1 = (props) => {
  return (
    <Layouts transparent>
      <>
       
        <HeroSlider />
        {/* <ServicesSection /> */}
        <AboutSection />
        <CountersSection />
        {/* <ProjectsSlider projects={props.projects} /> */}
        {/* <TeamSlider /> */}
        <FeaturesSection />
        {/* <PartnersSlider /> */}
        {/* <RenovationSection /> */}
        {/* <TestimonialSlider /> */}
        {/* <LatestPostsSection posts={props.posts} /> */}
      </>
    </Layouts>
  );
};
export default Home1;

export async function getStaticProps() {
  try {
    // For posts, we can use static data since it's from markdown files
    const allPosts = getSortedPostsData();
    
    // For projects, we'll try to fetch but provide fallback
    let allProjects = [];
    try {
      allProjects = await getSortedProjectsData();
    } catch (projectError) {
      console.warn('Could not fetch projects during build:', projectError);
      // Provide fallback project data
      allProjects = [
        {
          id: "1",
          title: "Sample Project",
          short: "This is a sample project description that will be shown when the API is not available.",
          location: "Sample Location",
          dates: "2024",
          image: "/img/project3.jpeg",
          status: "active"
        }
      ];
    }

    return {
      props: {
        posts: allPosts || [],
        projects: allProjects || []
      },
      // Revalidate every hour to get fresh data
      revalidate: 3600
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        posts: [],
        projects: []
      },
      revalidate: 3600
    }
  }
}