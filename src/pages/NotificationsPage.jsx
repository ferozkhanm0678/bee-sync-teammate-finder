import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  FolderKanban, 
  Check, 
  X, 
  Clock,
  ShieldCheck
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';

export function NotificationsPage({ setActivePage }) {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    acceptTeamInvite 
  } = useData();

  const getNotifIcon = (type) => {
    switch(type) {
      case 'team_invite': 
        return (
          <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30">
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
        );
      case 'match_alert':
        return (
          <div className="p-2.5 rounded-xl bg-cyan-600/20 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-5 h-5 text-cyan-300" />
          </div>
        );
      case 'milestone':
        return (
          <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        );
      default:
        return (
          <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
            <Bell className="w-5 h-5 text-purple-400" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Notifications & Activity</h1>
            <Badge variant="purple" size="sm">{notifications.filter(n => !n.read).length} Unread</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time teammate invitations, high compatibility alerts, and viva milestones.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-xs font-semibold text-purple-300 hover:text-cyan-300 transition-colors"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <GlassCard className="p-12 text-center border-purple-500/20 space-y-3">
          <Bell className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Notifications</h3>
          <p className="text-xs text-slate-400">You're all caught up! New invites and match alerts will appear here.</p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <GlassCard 
              key={notif.id}
              className={`p-4 sm:p-5 transition-all ${
                !notif.read 
                  ? 'border-purple-500/40 bg-purple-950/20 shadow-glow-sm' 
                  : 'border-purple-500/15 bg-slate-900/60 opacity-80'
              }`}
            >
              <div className="flex items-start gap-4">
                
                {getNotifIcon(notif.type)}

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white tracking-tight">{notif.title}</h4>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {notif.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>

                  {/* Actions for Team Invites */}
                  {notif.type === 'team_invite' && notif.actionRequired && !notif.read && (
                    <div className="flex items-center gap-2 pt-2.5">
                      <button
                        onClick={() => acceptTeamInvite(notif.id)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept & Join Team</span>
                      </button>
                      <button
                        onClick={() => markNotificationRead(notif.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  )}

                  {/* Action for Match Alert */}
                  {notif.type === 'match_alert' && (
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          markNotificationRead(notif.id);
                          setActivePage('find-teammates');
                        }}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Open Teammate Matching Hub</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </GlassCard>
          ))}
        </div>
      )}

    </div>
  );
}
