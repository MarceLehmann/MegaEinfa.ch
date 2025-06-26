# Jekyll Plugin für automatische Migration von vergangenen Events
# Dieses Plugin läuft automatisch bei jedem Jekyll Build

Jekyll::Hooks.register :site, :post_read do |site|
  # Lade upcoming events
  upcoming_events_file = File.join(site.source, '_data', 'upcoming_events.yml')
  
  if File.exist?(upcoming_events_file)
    upcoming_events = YAML.load_file(upcoming_events_file) || []
    today = Date.today
    
    # Filtere vergangene Events
    past_events = upcoming_events.select do |event|
      begin
        event_date = Date.parse(event['date'])
        event_date < today
      rescue
        false
      end
    end
    
    # Erstelle Aufzeichnungen für vergangene Events (falls noch nicht vorhanden)
    past_events.each do |event|
      filename = event['title'].downcase.gsub(/[^a-z0-9\s]/, '').gsub(/\s+/, '-')
      recording_file = File.join(site.source, '_recordings', "#{filename}.md")
      
      unless File.exist?(recording_file)
        # Erstelle automatisch eine Recording-Datei
        frontmatter = {
          'title' => event['title'],
          'date' => event['date'],
          'presenter' => event['presenter'],
          'youtube_id' => '', # Leer, muss manuell hinzugefügt werden
          'description' => event['description'],
          'migrated_from_events' => true
        }
        
        content = <<~MARKDOWN
          ---
          #{frontmatter.to_yaml.strip}
          ---

          #{event['description']}

          **Hinweis:** Diese Aufzeichnung wurde automatisch aus den Veranstaltungen migriert. 
          
          📹 **YouTube-Video hinzufügen:** 
          Bearbeiten Sie diese Datei und fügen Sie die `youtube_id` hinzu, um das Video anzuzeigen.
          
          **Originaltermin:** #{Date.parse(event['date']).strftime('%d.%m.%Y')} um #{event['time']}
        MARKDOWN
        
        File.write(recording_file, content)
        Jekyll.logger.info "Migration:", "Vergangenes Event '#{event['title']}' zu Aufzeichnungen migriert"
      end
    end
    
    # Entferne vergangene Events aus upcoming_events.yml (optional, auskommentiert für Sicherheit)
    # future_events = upcoming_events.reject do |event|
    #   begin
    #     event_date = Date.parse(event['date'])
    #     event_date < today
    #   rescue
    #     false
    #   end
    # end
    # 
    # if future_events.size != upcoming_events.size
    #   File.write(upcoming_events_file, future_events.to_yaml)
    #   Jekyll.logger.info "Migration:", "#{upcoming_events.size - future_events.size} vergangene Events aus upcoming_events.yml entfernt"
    # end
  end
end
