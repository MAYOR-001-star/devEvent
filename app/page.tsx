import React, { Suspense } from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import Event, {IEvent} from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { connection } from 'next/server';

const EventsList = async () => {
    await connection();
    await connectDB();
    const eventsData = await Event.find().sort({createdAt: -1}).lean();
    const events = JSON.parse(JSON.stringify(eventsData));

    return (
        <ul className="events list-none">
            {events && events.length > 0 && events.map((event: IEvent) => (
                <li key={event.title}>
                    <EventCard {...event} />
                </li>
            ))}
        </ul>
    )
}

const Page = () => {
    return (
        <section>
            <h1 className="text-center">The Hub for Every Dev <br/> Event You Can&#39;t Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

            <ExploreBtn/>

            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>
                
                <Suspense fallback={<p>Loading events...</p>}>
                    <EventsList />
                </Suspense>
            </div>
        </section>
    )
}
export default Page
