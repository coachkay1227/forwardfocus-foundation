import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SearchFilters from "@/components/resources/SearchFilters";
import ResourceCard from "@/components/resources/ResourceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type QuickFilter = "all" | "emergency" | "ongoing" | "new" | "partner";

interface Resource {
  id: string;
  name: string;
  organization: string;
  description: string;
  type: string;
  county: string;
  city: string;
  state_code: string;
  phone: string;
  website: string;
  address: string;
  justice_friendly: boolean;
  verified: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [county, setCounty] = useState(searchParams.get("county") || "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Search Resources | Forward Focus Elevation";
    fetchResources();
  }, [searchTerm, county, selectedTypes, quickFilter]);

  useEffect(() => {
    const q = searchParams.get("q");
    const c = searchParams.get("county");
    if (q) setSearchTerm(q);
    if (c) setCounty(c);
  }, [searchParams]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      let query = supabase.from("resources").select("*");

      // Apply search term filter
      if (searchTerm.trim()) {
        query = query.or(`name.ilike.%${searchTerm}%,organization.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply county filter
      if (county) {
        query = query.eq("county", county);
      }

      // Apply type filters
      if (selectedTypes.length > 0) {
        query = query.in("type", selectedTypes);
      }

      // Apply quick filters
      switch (quickFilter) {
        case "emergency":
          query = query.in("type", ["Emergency Services", "Crisis Intervention", "Legal Aid"]);
          break;
        case "ongoing":
          query = query.in("type", ["Employment", "Housing", "Mental Health", "Substance Abuse"]);
          break;
        case "new":
          query = query.gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
          break;
        case "partner":
          query = query.eq("verified", "partner");
          break;
      }

      query = query.order("rating", { ascending: false }).order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast({
        title: "Error",
        description: "Failed to load resources. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    if (county) params.set("county", county);
    setSearchParams(params);
  };

  const getResultsText = () => {
    const count = resources.length;
    if (loading) return "Searching...";
    if (count === 0) return "No resources found";
    return `${count} resource${count !== 1 ? "s" : ""} found`;
  };

  return (
    <main id="main" className="container py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl font-bold mb-6">Find Resources</h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Search our comprehensive directory of resources, organizations, and support services 
            for justice-impacted individuals and families.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search resources, organizations, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-muted" : ""}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button type="submit" className="px-8 shadow-md">
                Search
              </Button>
            </div>
          </div>
        </form>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-4 border rounded-lg bg-muted/50">
            <SearchFilters
              county={county}
              selectedTypes={selectedTypes}
              quickFilter={quickFilter}
              onCountyChange={setCounty}
              onTypesChange={setSelectedTypes}
              onQuickFilterChange={setQuickFilter}
            />
          </div>
        )}

        {/* Active Filters */}
        {(searchTerm || county || selectedTypes.length > 0 || quickFilter !== "all") && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <SearchIcon className="h-3 w-3" />
                  "{searchTerm}"
                </Badge>
              )}
              {county && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {county}
                </Badge>
              )}
              {selectedTypes.map((type) => (
                <Badge key={type} variant="secondary">
                  {type}
                </Badge>
              ))}
              {quickFilter !== "all" && (
                <Badge variant="secondary">
                  {quickFilter === "emergency" && "Emergency Services"}
                  {quickFilter === "ongoing" && "Ongoing Support"}
                  {quickFilter === "new" && "New Resources"}
                  {quickFilter === "partner" && "Partner Recommended"}
                </Badge>
              )}
            </div>
          </div>
        )}

        <Separator className="mb-6" />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{getResultsText()}</h2>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={{
                  id: resource.id,
                  name: resource.name,
                  org: resource.organization,
                  phone: resource.phone ? `tel:${resource.phone}` : undefined,
                  website: resource.website,
                  address: resource.address,
                  city: resource.city,
                  county: resource.county,
                  type: resource.type as "Housing" | "Employment" | "Legal" | "Financial" | "Health" | "Education" | "Family",
                  verified: resource.verified as "community" | "partner",
                  justiceFriendly: resource.justice_friendly,
                  rating: resource.rating,
                  updatedAt: resource.updated_at,
                  description: resource.description,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find more results.
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setCounty("");
              setSelectedTypes([]);
              setQuickFilter("all");
              setSearchParams({});
            }}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};
export default Search;
