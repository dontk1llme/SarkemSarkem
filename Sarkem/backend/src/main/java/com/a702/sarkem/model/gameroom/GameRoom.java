package com.a702.sarkem.model.gameroom;

import java.util.ArrayList;
import java.util.List;

import com.a702.sarkem.model.player.Player;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GameRoom {
	private String roomId;
	private String gameId;
	private List<Player> players = new ArrayList<>(10);
	private String hostId;
	
	public GameRoom(String roomId) {
		this.roomId = roomId;
	}
	
	/**
	 * 플레이어 수 리턴
	 * @return 플레이어 수
	 */
	public int getPlayerCount() {
		return players.size();
	}
	
	public Player getPlayer(String playerId) {
		for(Player p : this.players) {
			if (p.getPlayerId().equals(playerId)) {
				return p;
			}
		}
		return null;
	}
	
	public List<String> getPlayersId() {
		List<String> playersId = new ArrayList<>();
		for (Player player : this.players) {
			playersId.add(player.getPlayerId());
		}
		return playersId;
	}
	
	public void deletePlayer(String playerId) {
		int playerCnt = this.getPlayerCount();
		for(int i = 0; i < playerCnt; i++) {
			if(this.players.get(i).getPlayerId().equals(playerId)) {
				this.players.remove(i);
				return;
			}
		}
	}
}
