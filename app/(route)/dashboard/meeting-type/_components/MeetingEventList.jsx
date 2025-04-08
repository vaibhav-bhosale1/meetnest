"use client"
import React, { useEffect, useState } from 'react'
import { app } from '@/config/Firebaseconfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { 
  Calendar, 
  Clock, 
  Copy, 
  ExternalLink, 
  Loader2, 
  MapPin, 
  MoreHorizontal, 
  Pencil, 
  Share2, 
  Trash2 
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const MeetingEventList = () => {
  const db = getFirestore(app)
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([]);
  const [businessInfo, setBusinessInfo] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (user) {
      Promise.all([getEventList(), BusinessInfo()])
        .finally(() => setIsLoading(false));
    }
  }, [user])

  const BusinessInfo = async () => {
    const docRef = doc(db, 'Business', user.email);
    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data())
  }
  
  const getEventList = async () => {
    setEventList([])
    const q = query(collection(db, "MeetingEvent"), where("createdBy", "==", user?.email));
    
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });
    setEventList(events);
  }

  const onDeleteMeetingEvent = async (event) => {
    setDeleting(event.id);
    try {
      await deleteDoc(doc(db, "MeetingEvent", event?.id));
      toast.success("Meeting event deleted successfully");
      getEventList();
    } catch (error) {
      toast.error("Failed to delete event");
      console.error("Delete error:", error);
    } finally {
      setDeleting(null);
    }
  }

  
  const onCopyClipHandler = (event) => {
    const meetingEventUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${businessInfo.businessName}/${event.id}`;
    navigator.clipboard.writeText(meetingEventUrl);
    toast.success("Event link copied to clipboard");
  }

  // Function to get a lighter shade of the theme color for background
  const getLighterShade = (hexColor) => {
    // If no color provided, default to light orange
    if (!hexColor) return "#FFF0E6";
    
    try {
      // Convert hex to RGB
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      
      // Lighten by mixing with white
      const lighterR = Math.floor(r * 0.2 + 255 * 0.8);
      const lighterG = Math.floor(g * 0.2 + 255 * 0.8);
      const lighterB = Math.floor(b * 0.2 + 255 * 0.8);
      
      // Convert back to hex
      return `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;
    } catch (e) {
      return "#FFF0E6"; // Default light orange
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-10 w-10 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-500">Loading your events...</p>
      </div>
    );
  }

  return (

  
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
        Your <span className="text-orange-600">Meeting Events</span>
      </h1>
      
      {eventList.length === 0 ? (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-8 text-center">
          <Calendar className="h-16 w-16 mx-auto text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">You haven't created any meeting events yet.</p>
          <Button className="bg-orange-500 hover:bg-orange-600">
            Create Your First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventList.map((event, index) => {
            const bgColor = getLighterShade(event?.themeColor || "#FF8C3B");
            
            return (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-xl shadow-md bg-white hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Colored header section */}
                <div 
                  className="h-3" 
                  style={{ backgroundColor: event?.themeColor || "#FF8C3B" }}
                />
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge 
                      className="font-medium bg-orange-100 text-orange-800 hover:bg-orange-200 border-none"
                    >
                      {event?.duration} min
                    </Badge>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Event Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer flex items-center gap-2"
                        >
                          <Pencil className="h-4 w-4" /> Edit Event
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer flex items-center gap-2 text-red-600 focus:text-red-600"
                          onClick={() => onDeleteMeetingEvent(event)}
                          disabled={deleting === event.id}
                        >
                          {deleting === event.id ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4" /> Delete Event
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {event?.eventName}
                  </h2>
                  
                  <div 
                    className="rounded-lg p-3 mb-4 flex items-center gap-3"
                    style={{ backgroundColor: bgColor }}
                  >
                    <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700">{event?.locationType}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-orange-200 hover:bg-orange-50 text-orange-600 flex items-center gap-2"
                      onClick={() => onCopyClipHandler(event)}
                    >
                      <Copy className="h-4 w-4" /> 
                      Copy Link
                    </Button>
                    
                    <Button 
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>

  )
}

export default MeetingEventList