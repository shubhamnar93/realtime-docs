"use client";
import { usePaginatedQuery } from "convex/react";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "@/convex/_generated/api";
import { DocumentsTable } from "./documents-table";

const Home = () => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    {},
    { initialNumItems: 5 }
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 p-4 left-0 right-0 z-10 h-16 bg-white">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
};
export default Home;
