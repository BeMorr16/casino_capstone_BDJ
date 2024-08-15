import { useQuery } from '@tanstack/react-query'
import useUserState from '../../store/store';
import { getMiniGameStats } from '../Utils/APIRequests';
import { useState } from 'react';
import './userminigame.css'

export default function UserMinigame() {
    const { id } = useUserState();

    const [sortBy, setSortBy] = useState('endTotal');
    const { data, isLoading, isError } = useQuery({
        queryKey: ['minigame', id],
        queryFn: () => getMiniGameStats(id),
        enabled: !!id
    });


    if (isLoading) {
        return <div>Is Loading</div>
    }
    if (isError) {
        return <div>Error loading minigame stats</div>
    }
    const sortedData = data.sort((a, b) => {
        if (sortBy === 'endTotal') {
            return b.endtotal - a.endtotal;
        }
        if (sortBy === 'total_wins') {
            return b.total_wins - a.total_wins;
        }
        return 0;
    });

    const headers = ['#', 'Total Wins', 'End Total', 'Date'];
console.log(data)
  return (
    <div className="minigame-bet-table"> {/* Updated class name */}
    <h2 className="minigame-User-History-h2">Mini-Game Stats</h2>
    <div className="minigame-filters">
        <div className="minigame-filter-group">
            <label htmlFor="sort-select">Sort By:</label>
            <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="endTotal">Total Winnings</option>
                <option value="total_wins">Number of Wins</option>
            </select>
        </div>
    </div>
    <div className="minigame-table-headers">
        {headers.map((header, index) => (
            <div key={index} className="minigame-table-header">{header}</div>
        ))}
    </div>
    <div className="minigame-table-body">
        {sortedData.map((stat, index) => (
            <div key={stat.id} className="minigame-table-row">
                <div className="minigame-table-cell">{index + 1}</div>
                <div className="minigame-table-cell">{stat.total_wins}</div>
                <div className="minigame-table-cell">{stat.endtotal}</div>
                <div className="minigame-table-cell">{new Date(stat.completed_at).toLocaleString()}</div>
            </div>
        ))}
    </div>
</div>
  )
}
